<svelte:options immutable={true} accessors={true} />

<script lang="ts" context="module">
	const ZONE_ATTR = 'data-dnd-zone';
	const ZONE_SELECTOR = `[${ZONE_ATTR}]`;
	const HANDLE_SELECTOR = '[data-dnd-handle]';
	const COPY_ATTR = 'data-dnd-copy';
	const PLACEHOLDER_ATTR = 'data-dnd-placeholder';
	const DRAG_TOLERANCE = 5; //px
	const dropzones = new Array<DropZone>();

	let click: Click = undefined;
	let active: Dragging = undefined;
	let raf: number | undefined; // animation frame

	const dragging = writable<Dragging | undefined>(undefined);
</script>

<script lang="ts">
	import type {
		Dragging,
		Click,
		DropEvent,
		DropZone,
		Destination,
		DropZoneConstuctable
	} from './types';
	import { onMount, createEventDispatcher } from 'svelte';
	import { Direction, EventType } from './types';
	import { writable } from 'svelte/store';
	import { viewPortScroll } from './funcs';

	export let id: string;
	export let itemCount: number;
	export let itemSize: number;
	export let type: DropZoneConstuctable;

	export let priority = 1;
	export let scrollSpeed = 15;
	export let itemClass = '';
	export let zoneClass = '';
	export let keyFn: (index: number) => number | string = (i) => i;
	export let useHandle = false;
	export let allowDrag: (index: number) => boolean = () => true;
	// export let allowDrop: (zone: DropZone) => boolean = () => true;
	export let copy = false;

	export const dropzone: DropZone = new type(id, priority, itemCount, itemSize);
	const dispatch = createEventDispatcher();

	let items: undefined[] = new Array(itemCount);

	$: dropzone.id = id;
	$: itemStyle = `${
		dropzone.direction === Direction.Vertical ? 'height' : 'width'
	}: ${itemSize}px;`;

	$: if (itemCount != dropzone.count || itemSize !== dropzone.itemSize) {
		dropzone.count = itemCount;
		dropzone.itemSize = itemSize;
		items = new Array(itemCount);
		if (dropzone.el) {
			dropzone.styleContainerBaseStyle();
		}
	}

	onMount(() => {
		dropzone.styleContainerBaseStyle();
		dropzones.push(dropzone);
		dropzones.sort((a, b) => b.priority - a.priority);

		return () => {
			dropzones.splice(
				dropzones.findIndex((dz) => dz === dropzone),
				1
			);
		};
	});

	function findDropZone(x: number, y: number): [Element, DropZone | undefined] {
		const el = document.elementFromPoint(x, y);
		const zone = el?.closest(ZONE_SELECTOR);
		return [el, zone ? dropzones.find((dz) => dz.el === zone) : undefined];
	}

	function onMouseDown(e: MouseEvent, index: number) {
		if (
			e.button !== 0 ||
			!allowDrag(index) ||
			(useHandle && (e.target as HTMLDivElement).closest(HANDLE_SELECTOR) === null)
		) {
			return;
		}

		document.addEventListener('mousemove', onMouseDrag);
		document.addEventListener('mouseup', onMouseDragEnd);

		onDown({ pageX: e.pageX, pageY: e.pageY }, index);
	}

	function onTouchDown(e: TouchEvent, index: number) {
		if (
			!allowDrag(index) ||
			(useHandle && (e.target as HTMLDivElement).closest(HANDLE_SELECTOR) === null)
		) {
			return;
		}

		document.addEventListener('touchmove', onTouchDrag);
		document.addEventListener('touchend', onTouchDragEnd);

		onDown({ pageX: e.touches[0].pageX, pageY: e.touches[0].pageY }, index);
	}

	function onDown({ pageX, pageY }: { pageX: number; pageY: number }, index: number) {
		const el = dropzone.items[index];
		const br = el.getBoundingClientRect();

		click = {
			el,
			initPageX: pageX,
			initPageY: pageY,
			sourceIndex: index,
			dragLeft: pageX - br.left,
			dragTop: pageY - br.top,
			sourceZone: dropzone
		};
	}

	function onMouseDrag(e: MouseEvent) {
		onDrag(e);
	}

	function onTouchDrag(e: TouchEvent) {
		onDrag({
			pageX: e.touches[0].pageX,
			pageY: e.touches[0].pageY,
			clientX: e.touches[0].clientX,
			clientY: e.touches[0].clientY
		});
	}

	function onDrag({
		pageX,
		pageY,
		clientX,
		clientY
	}: {
		pageX: number;
		pageY: number;
		clientX: number;
		clientY: number;
	}) {
		if (
			active === undefined &&
			(Math.abs(pageX - click.initPageX) > DRAG_TOLERANCE ||
				Math.abs(pageY - click.initPageY) > DRAG_TOLERANCE)
		) {
			if (active) {
				finalizeDrag();
			}

			const resetZones = new Set([dropzone]);
			let placeholder: HTMLDivElement;
			let el: HTMLDivElement;
			let type: EventType;

			if (copy) {
				type = EventType.UserCopy;
				el = click.el.cloneNode(true) as HTMLDivElement;
				el.setAttribute(COPY_ATTR, '');
				document.body.appendChild(el);
			} else {
				type = EventType.UserDrag;
				el = click.el;

				placeholder = document.createElement('div');
				placeholder.style.cssText = dropzone.placeholderStyleStr();
				placeholder.setAttribute(PLACEHOLDER_ATTR, '');
				dropzone.el.appendChild(placeholder);
			}

			active = {
				type,
				el,
				placeholder,
				resetZones,
				sourceIndex: click.sourceIndex,
				hoverIndex: undefined,
				sourceZone: click.sourceZone,
				destZone: dropzone,
				dragLeft: click.dragLeft - window.scrollX,
				dragTop: click.dragTop - window.scrollY,
				onResolve: undefined
			};
			$dragging = active; // reactive value
			click = undefined;

			document.body.style.cursor = 'grabbing';
		}

		if (active) {
			if (raf) cancelAnimationFrame(raf);

			// todo, we should update the pageX/pageY fields with the scrolled ammount on repeating dragFn
			const dragFn = () => {
				raf = undefined;

				const drag = active;
				const { el, sourceZone, sourceIndex, dragLeft, dragTop } = drag;

				const tx = clientX - dragLeft;
				const ty = clientY - dragTop;

				const posx = pageX - window.scrollX;
				const posy = pageY - window.scrollY;

				const [over, dest] = findDropZone(posx, posy);
				if (dest === sourceZone) {
					// same zone reorder
					// style the dragging element
					const enteredZone = dest !== drag.destZone;

					// first render into this dropzone lets tidy up the last dropzone
					if (enteredZone) {
						if (drag.destZone !== undefined) {
							drag.destZone.styleDestReset();
						}
					}

					const hoverIndex = dest.pointIndex(posx, posy);
					if (drag.type === EventType.UserDrag && (hoverIndex !== drag.hoverIndex || enteredZone)) {
						dest.styleSourceMove(hoverIndex, sourceIndex, drag.hoverIndex !== undefined);
						active = {
							...active,
							hoverIndex: hoverIndex,
							destZone: dest
						};
						$dragging = active;
					}

					el.style.cssText = `
						position: fixed;
						top: 0;
						left: 0;
						z-index:1000;
						pointer-events:none;
						cursor:grabbing;
						height:${sourceZone.itemHeight()}px;
						width:${sourceZone.itemWidth()}px; 
						transform:translate(${tx}px,${ty}px);
						transition: 
							height 0.2s cubic-bezier(0.2, 0, 0, 1), 
							width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`;
				} else {
					// new zone
					const enteredZone = dest !== drag.destZone;

					// first render into this dropzone (or out of if dest = undefined)
					// lets tidy up the last dropzone
					if (enteredZone) {
						// source zone needs to render collapsing the missing item
						if (drag.type === EventType.UserDrag && drag.destZone === sourceZone) {
							drag.destZone.styleSourceMissing(sourceIndex);
							// other zones can just render back to normal
						} else if (drag.destZone !== undefined) {
							drag.destZone.styleDestReset();
						}
					}

					if (dest !== undefined) {
						// style the dragging element - it keeps its source dimensions as its not inside a drop zone

						// lets increase this containers size on first render to hold the new
						// item where hovering over it
						if (enteredZone) {
							// market this zone as needing style reseting a zone might be dragged
							// over without, a drop, making it neither src or dest zone we still
							// want to tidy up the styles we leave behind on dragend tho
							drag.resetZones.add(dest);
						}

						// and adjust the styles of the items and update dragging
						const hoverIndex = dest.pointIndex(posx, posy);
						if (hoverIndex !== drag.hoverIndex || enteredZone) {
							dest.styleDestMove(hoverIndex);
							active = {
								...active,
								hoverIndex: hoverIndex,
								destZone: dest
							};
							$dragging = active;
						}

						el.style.cssText = `
							position: fixed;
							top: 0;
							left: 0;
							z-index:1000;
							pointer-events: none;
							cursor: grabbing;
							height: ${dest.itemHeight()}px;
							width: ${dest.itemWidth()}px;
							transform: translate(${tx}px,${ty}px);
							transition: 
								height 0.2s cubic-bezier(0.2, 0, 0, 1), 
								width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`;
					} else {
						// style the dragging element - it keeps its source dimensions as its not inside a drop zone

						// first render out of a dropzone, update dragging
						if (enteredZone) {
							active = {
								...active,
								hoverIndex: -1,
								destZone: undefined
							};
							$dragging = active;
						}

						el.style.cssText = `
							position: fixed;
							top: 0;
							left: 0;
							z-index: 1000;
							pointer-events: none;
							cursor: grabbing;
							height: ${drag.sourceZone.itemHeight()}px;
							width: ${drag.sourceZone.itemWidth()}px;
							transform: translate(${tx}px,${ty}px);
							transition:
								height 0.2s cubic-bezier(0.2, 0, 0, 1), 
								width 0.2s cubic-bezier(0.2, 0, 0, 1);
						`;
					}
				}

				// scroll global window & dnd window if needed
				if (viewPortScroll(clientX, clientY, over, scrollSpeed)) {
					raf = requestAnimationFrame(dragFn);
				}
			};
			raf = requestAnimationFrame(dragFn);
		}
	}

	function onMouseDragEnd(_e: MouseEvent) {
		document.removeEventListener('mousemove', onMouseDrag);
		document.removeEventListener('mouseup', onMouseDragEnd);

		if (!active) {
			return;
		}

		onDragEnd();
	}

	function onTouchDragEnd(_e: TouchEvent) {
		document.removeEventListener('touchmove', onTouchDrag);
		document.removeEventListener('touchend', onTouchDragEnd);

		if (!active) {
			return;
		}

		onDragEnd();
	}

	function onDragEnd() {
		if (raf) {
			cancelAnimationFrame(raf);
		}

		const { el, destZone, sourceZone, sourceIndex, type } = active;
		const hoverIndex = active.hoverIndex ?? sourceIndex;

		document.body.style.cursor = '';
		el.addEventListener('transitionend', finalizeDrag);

		let tx: number,
			ty: number,
			height: number,
			width: number,
			forceFinal = false;

		if (destZone === sourceZone && type !== EventType.UserCopy) {
			let widthLastOffset = 0;
			let heightLastOffset = 0;

			const { count, direction } = sourceZone;
			if (hoverIndex === count) {
				if (direction === Direction.Vertical) {
					heightLastOffset = -1;
				} else if (direction === Direction.Horizontal) {
					widthLastOffset = -1;
				}
			}

			tx = sourceZone.dragXOffset(hoverIndex + widthLastOffset);
			ty = sourceZone.dragYOffset(hoverIndex + heightLastOffset);

			height = sourceZone.itemHeight();
			width = sourceZone.itemWidth();
			// detect when a transitionEnd event wont fire as the transition is already in the
			// finishing position
			forceFinal =
				el.style.transform === `translate(${tx}px, ${ty}px)` || el.style.transform === '';
		} else if (destZone !== undefined && destZone !== sourceZone) {
			tx = destZone.dragXOffset(hoverIndex, destZone.count + 1);
			ty = destZone.dragYOffset(hoverIndex, destZone.count + 1);

			height = destZone.itemHeight();
			width = destZone.itemWidth();
		} else {
			tx = sourceZone.dragXOffset(sourceIndex);
			ty = sourceZone.dragYOffset(sourceIndex);
			height = sourceZone.itemHeight();
			width = sourceZone.itemWidth();

			if (type !== EventType.UserCopy) {
				sourceZone.styleSourceMove(sourceIndex, sourceIndex, true);
			}
		}

		el.style.cssText = `
			top: 0;
			left: 0;
			z-index: 1000;
			position: fixed;
			height: ${height}px;
			width: ${width}px;
			transform: translate(${tx}px,${ty}px);
			transition: 
				transform 0.2s cubic-bezier(0.2,0,0,1),
				height 0.2s cubic-bezier(0.2, 0, 0, 1),
				width 0.2s cubic-bezier(0.2, 0, 0, 1);
		`;

		// if a force was detected as needed, fire it off here
		if (forceFinal) {
			finalizeDrag();
		}
	}

	function finalizeDrag(ev?: TransitionEvent) {
		const { el, destZone, sourceZone, sourceIndex, resetZones, placeholder, type } = active;
		const hoverIndex = active.hoverIndex ?? sourceIndex; // if no drag action took place hover may be undef

		if (el && type === EventType.UserCopy) {
			el.remove();
		}

		if (ev && ev.target !== el) {
			return;
		}

		if (raf) cancelAnimationFrame(raf);
		raf = undefined;

		const from: Destination = {
			dropZoneID: sourceZone.id,
			index: sourceIndex
		};
		const to: Destination | undefined = destZone
			? destZone === sourceZone && hoverIndex === sourceIndex
				? from
				: { dropZoneID: destZone.id, index: hoverIndex }
			: undefined;

		dispatch('drop', { from, to } as DropEvent);

		if (placeholder) {
			sourceZone.el.removeChild(placeholder);
		}

		resetZones.forEach((zone) => zone.styleRemove());
		el.removeEventListener('transitionend', finalizeDrag);

		active.onResolve?.();
		active = undefined;
		$dragging = undefined;
	}

	export async function move(
		srcIndex: number,
		destIndex: number,
		destZone: DropZone,
		transitionDur = 500
	) {
		return new Promise<void>((resolve) => {
			if (active !== undefined) {
				resolve();
				return;
			}

			const el = dropzone.items[srcIndex];
			if (!el) {
				resolve();
				return;
			}

			// initial style for begining of element transition
			{
				const tx = dropzone.dragXOffset(srcIndex);
				const ty = dropzone.dragYOffset(srcIndex);
				const height = dropzone.itemHeight();
				const width = dropzone.itemWidth();

				el.style.cssText = `
					z-index: 1000;
					height: ${height}px;
					width: ${width}px;
					position: fixed;
					transform: translate(${tx}px,${ty}px);
				`;
			}

			// style the containers
			dropzone.styleSourceMove(srcIndex, srcIndex, false);
			if (destZone !== dropzone) {
				setTimeout(() => {
					active?.type === EventType.Programatic && dropzone.styleSourceMissing(srcIndex);
				}, transitionDur * 0.4);
				destZone.styleDestMove(destIndex);
			} else {
				setTimeout(() => {
					active?.type === EventType.Programatic &&
						dropzone.styleSourceMove(destIndex, srcIndex, true);
				}, transitionDur * 0.25);
			}

			active = {
				type: EventType.Programatic,
				el,
				placeholder: undefined,
				resetZones: new Set([dropzone, destZone]),
				sourceIndex: srcIndex,
				hoverIndex: destIndex,
				sourceZone: dropzone,
				destZone: destZone,
				dragLeft: 0,
				dragTop: 0,
				onResolve: resolve
			};
			$dragging = active;

			// style the moving element, to its final position/transition
			{
				const tx = destZone.dragXOffset(destIndex, destZone.count + 1);
				const ty = destZone.dragYOffset(destIndex, destZone.count + 1);
				const height = destZone.itemHeight();
				const width = destZone.itemWidth();

				el.addEventListener('transitionend', finalizeDrag);
				el.style.cssText = `
					z-index: 1000; 
					position: fixed; 
					top:0; left: 0;
					height: ${height}px; 
					width: ${width}px; 
					transform: translate(${tx}px,${ty}px); 
					transition:
						transform ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
						height ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
						width ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1);
				`;
			}
		});
	}

	// this could probably be rewritten better
	export async function remove(index: number, transitionDur = 500) {
		return new Promise<void>((resolve) => {
			if (active !== undefined) {
				resolve();
				return;
			}

			const el = dropzone.items[index];
			if (!el) {
				resolve();
				return;
			}

			// init element style
			el.style.cssText = `height:${dropzone.itemHeight()}px; width:${dropzone.itemWidth()}px; position:fixed; opacity: 1;`;

			// style the containers
			dropzone.styleSourceMove(index, index, false);
			setTimeout(() => {
				active?.type === EventType.Programatic && dropzone.styleSourceMissing(index);
			}, transitionDur * 0.4);

			active = {
				type: EventType.Programatic,
				el,
				placeholder: undefined,
				resetZones: new Set([dropzone]),
				sourceIndex: index,
				hoverIndex: index,
				sourceZone: dropzone,
				destZone: undefined,
				dragLeft: 0,
				dragTop: 0,
				onResolve: resolve
			};
			$dragging = active;

			// style the moving element, to its final position/transition
			{
				const tx = dropzone.dragXOffset(index, dropzone.count + 1);
				const ty = dropzone.dragYOffset(index, dropzone.count + 1);
				const height = dropzone.itemHeight();
				const width = dropzone.itemWidth();

				el.addEventListener('transitionend', finalizeDrag);
				el.style.cssText = `
					position: fixed; 
					top:0; left: 0;
					height: ${height}px; 
					width: ${width}px; 
					opacity: 0.6;
					transform: translate(${tx}px,${ty}px); 
					transition:
						opacity ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1);
						transform ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
						height ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
						width ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1);
				`;
			}
		});
	}
</script>

<div data-dnd-zone class={`${zoneClass} ${dropzone.containerClass}`} bind:this={dropzone.el}>
	{#each items as _, i (keyFn(i))}
		<div
			data-dnd-item
			data-dnd-dragging={(active?.sourceIndex === i && active?.sourceZone.id === id) ||
			$dragging === null
				? true
				: undefined}
			class={itemClass}
			style={itemStyle}
			bind:this={dropzone.items[i]}
			on:mousedown={(e) => onMouseDown(e, i)}
			on:touchstart={(e) => onTouchDown(e, i)}
		>
			<slot
				index={i}
				drag={$dragging?.sourceZone?.id === id || $dragging?.destZone?.id === id
					? $dragging
					: undefined}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	div[data-dnd-zone] {
		display: flex;
		position: relative;
		height: 100%;
		width: 100%;
		overflow: auto;
		overflow-anchor: none;

		&.horizontal {
			flex-direction: row;
		}

		&.vertical {
			flex-direction: column;
		}

		&.center {
			&.horizontal {
				div[data-dnd-item] {
					// first child or if thats dragging (non-layout pos fixed)
					// then the next item in the list
					&:first-child,
					&[data-dnd-dragging]:first-child + * {
						margin-left: auto;
					}
					&:last-child {
						margin-right: auto;
					}
				}

				:global(div[data-dnd-placeholder]:first-child) {
					margin-left: auto;
				}
				:global(div[data-dnd-placeholder]:last-child) {
					margin-right: auto;
				}
			}
		}
		:global(div[data-dnd-placeholder]) {
			flex-shrink: 0;
			flex-grow: 0;
		}
	}

	div[data-dnd-item] {
		position: relative;
		user-select: none;
		touch-action: none;
		flex-shrink: 0;
		flex-grow: 0;
	}

	:global(*[data-dnd-handle]) {
		cursor: grab !important;
	}
</style>
