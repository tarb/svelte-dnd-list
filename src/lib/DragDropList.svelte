<svelte:options immutable={true} />

<script lang="ts" context="module">
	const HANDLE_SELECTOR = '[data-dndhandle]';
	const DRAG_TOLERANCE = 5; //px
	const dropzones = new Array<DropZone>();

	let click: Click = undefined;
	let active: Dragging = undefined;
	let raf: number | undefined; // animation frame
</script>

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { Direction, EventType } from './types';
	import type {
		Dragging,
		Click,
		DropEvent,
		DropZone,
		Destination,
		DropZoneConstuctable
	} from './types';

	export let id: string;
	export let itemCount: number;
	export let itemSize: number;
	export let type: DropZoneConstuctable;

	export let priority = 1;
	export let itemClass = '';
	export let zoneClass = '';
	export let keyFn: (index: number) => any = (i) => i;
	export let useHandle = false;

	export const dropzone: DropZone = new type(id, priority, itemCount, itemSize);
	const dispatch = createEventDispatcher();

	// use the module variable 'active' but update this on significant changes so the the props vars update
	let dragging: Dragging;
	let items: undefined[] = new Array(itemCount);

	$: dropzone.id = id;

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

	function findDropZone(x: number, y: number): DropZone | undefined {
		for (let i = 0; i < dropzones.length; ++i) {
			const dz = dropzones[i];

			if (dz.insideBounding(x, y)) {
				return dz;
			}
		}

		return undefined;
	}

	function onMouseDown(e: MouseEvent, index: number) {
		if (
			e.button !== 0 ||
			(useHandle && (e.target as HTMLDivElement).closest(HANDLE_SELECTOR) === null)
		) {
			return;
		}

		document.addEventListener('mousemove', onMouseDrag);
		document.addEventListener('mouseup', onMouseDragEnd);

		onDown({ pageX: e.pageX, pageY: e.pageY }, index);
	}

	function onTouchDown(e: TouchEvent, index: number) {
		if (useHandle && (e.target as HTMLDivElement).closest(HANDLE_SELECTOR) === null) {
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
			pageY: e.touches[0].pageY
		});
	}

	function onDrag({ pageX, pageY }: { pageX: number; pageY: number }) {
		if (
			active === undefined &&
			(Math.abs(pageX - click.initPageX) > DRAG_TOLERANCE ||
				Math.abs(pageY - click.initPageY) > DRAG_TOLERANCE)
		) {
			if (active) {
				finalizeDrag();
			}

			const placeholder = document.createElement('div');
			placeholder.style.cssText = dropzone.placeholderStyleStr();
			placeholder.setAttribute('data-dndplaceholder', '');
			dropzone.el.appendChild(placeholder);

			active = {
				type: EventType.User,
				el: click.el,
				placeholder,
				resetZones: new Set([dropzone]),
				sourceIndex: click.sourceIndex,
				hoverIndex: undefined,
				sourceZone: click.sourceZone,
				destZone: dropzone,
				dragLeft: click.dragLeft,
				dragTop: click.dragTop,
				onMoveResolve: undefined
			};
			dragging = active; // reactive value
			click = undefined;

			document.body.style.cursor = 'grabbing';
		}

		if (active) {
			if (raf) {
				cancelAnimationFrame(raf);
			}
			raf = requestAnimationFrame(() => {
				raf = undefined;

				const drag = active;
				const { el, sourceZone, sourceIndex, dragLeft, dragTop } = drag;

				const tx = pageX - dragLeft;
				const ty = pageY - dragTop;

				let dest = findDropZone(pageX, pageY);
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

					const hoverIndex = dest.pointIndex(pageX, pageY);
					if (hoverIndex !== drag.hoverIndex || enteredZone) {
						dest.styleSourceMove(hoverIndex, sourceIndex, drag.hoverIndex !== undefined);
						active = {
							...active,
							hoverIndex: hoverIndex,
							destZone: dest
						};
						dragging = active;
					}

					el.style.cssText = `position: fixed; top: 0; left: 0; z-index:1000; pointer-events:none; cursor:grabbing; height:${sourceZone.itemHeight()}px; width:${sourceZone.itemWidth()}px; transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1); position:fixed; transform:translate(${tx}px,${ty}px)`;
				} else {
					// new zone
					const enteredZone = dest !== drag.destZone;

					// first render into this dropzone (or out of if dest = undefined)
					// lets tidy up the last dropzone
					if (enteredZone) {
						// source zone needs to render collapsing the missing item
						if (drag.destZone === sourceZone) {
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
						const hoverIndex = dest.pointIndex(pageX, pageY);
						if (hoverIndex !== drag.hoverIndex || enteredZone) {
							dest.styleDestMove(hoverIndex);
							active = {
								...active,
								hoverIndex: hoverIndex,
								destZone: dest
							};
							dragging = active;
						}

						el.style.cssText = `position: fixed; top: 0; left: 0; z-index:1000; pointer-events: none; cursor:grabbing; position:fixed; height:${dest.itemHeight()}px; width:${dest.itemWidth()}px; transition: height 0.2s cubic-bezier(0.2, 0, 0, 1); transform:translate(${tx}px,${ty}px); transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;
					} else {
						// style the dragging element - it keeps its source dimensions as its not inside a drop zone

						// first render out of a dropzone, update dragging
						if (enteredZone) {
							active = {
								...active,
								hoverIndex: -1,
								destZone: undefined
							};
							dragging = active;
						}

						el.style.cssText = `position: fixed; top: 0; left: 0; z-index:1000; pointer-events:none; cursor:grabbing; position:fixed; transform:translate(${tx}px,${ty}px); height:${drag.sourceZone.itemHeight()}px; width:${drag.sourceZone.itemWidth()}px;  transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;
					}
				}
			});
		}
	}

	function onMouseDragEnd(e: MouseEvent) {
		document.removeEventListener('mousemove', onMouseDrag);
		document.removeEventListener('mouseup', onMouseDragEnd);

		if (!active) {
			return;
		}

		onDragEnd();
	}

	function onTouchDragEnd(e: TouchEvent) {
		document.removeEventListener('touchmove', onTouchDrag);
		document.removeEventListener('touchend', onTouchDragEnd);

		if (active) {
			return;
		}

		onDragEnd();
	}

	function onDragEnd() {
		if (raf) {
			cancelAnimationFrame(raf);
		}

		const { el, destZone, sourceZone, sourceIndex } = active;
		const hoverIndex = active.hoverIndex ?? sourceIndex;

		document.body.style.cursor = '';
		el.addEventListener('transitionend', finalizeDrag);

		let tx: number,
			ty: number,
			height: number,
			width: number,
			forceFinal: boolean = false;

		if (destZone === sourceZone) {
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
		} else if (destZone !== undefined) {
			tx = destZone.dragXOffset(hoverIndex, destZone.count + 1);
			ty = destZone.dragYOffset(hoverIndex, destZone.count + 1);

			height = destZone.itemHeight();
			width = destZone.itemWidth();
		} else {
			tx = sourceZone.dragXOffset(sourceIndex);
			ty = sourceZone.dragYOffset(sourceIndex);
			height = sourceZone.itemHeight();
			width = sourceZone.itemWidth();

			sourceZone.styleSourceMove(sourceIndex, sourceIndex, true);
		}

		el.style.cssText = `position: fixed; top: 0; left: 0; z-index:1000; position:fixed; height:${height}px; width:${width}px; transform:translate(${tx}px,${ty}px); transition:transform 0.2s cubic-bezier(0.2,0,0,1), height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;

		// if a force was detected as needed, fire it off here
		if (forceFinal) {
			finalizeDrag();
		}
	}

	function finalizeDrag(ev?: TransitionEvent) {
		const { el, destZone, sourceZone, sourceIndex, resetZones, placeholder } = active;
		const hoverIndex = active.hoverIndex ?? sourceIndex; // if no drag action took place hover may be undef

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

		if (placeholder) {
			sourceZone.el.removeChild(placeholder);
		}

		resetZones.forEach((zone) => zone.styleRemove());
		el.removeEventListener('transitionend', finalizeDrag);

		active.onMoveResolve?.();
		active = undefined;
		dragging = undefined;

		dispatch('drop', { from, to } as DropEvent);
	}

	export async function move(
		srcIndex: number,
		destIndex: number,
		destZone: DropZone,
		transitionDur: number = 500
	) {
		return new Promise<void>((resolve, reject) => {
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

				el.style.cssText = `z-index:1000; height:${height}px; width:${width}px; position:fixed; transform:translate(${tx}px,${ty}px)`;
			}

			// style the containers
			dropzone.styleSourceMove(srcIndex, srcIndex, false);
			if (destZone !== dropzone) {
				setTimeout(() => {
					dragging?.type === EventType.Programatic && dropzone.styleSourceMissing(srcIndex);
				}, transitionDur * 0.4);
				destZone.styleDestMove(destIndex);
			} else {
				setTimeout(() => {
					dragging?.type === EventType.Programatic &&
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
				onMoveResolve: resolve
			};
			dragging = active;

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
                    width ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1);`;
			}
		});
	}
</script>

<div data-dndzone class={`${zoneClass} ${dropzone.containerClass}`} bind:this={dropzone.el}>
	{#each items as _, i (keyFn(i))}
		<div
			data-dnditem
			class={`${itemClass} ${
				active?.sourceIndex === i || dragging === null // this dragging === null will never be true, but forces the statement to be reactive
					? `dragging ${active.type === EventType.User ? 'user' : 'prog'}`
					: ''
			}`}
			style={`${dropzone.direction === Direction.Vertical ? 'height' : 'width'}: ${itemSize}px;`}
			bind:this={dropzone.items[i]}
			on:mousedown={(e) => onMouseDown(e, i)}
			on:touchstart={(e) => onTouchDown(e, i)}
		>
			<slot
				index={i}
				drag={dragging?.sourceIndex === i && dragging.sourceZone.id === id ? dragging : undefined}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	div[data-dndzone] {
		display: flex;
		position: relative;
		height: 100%;
		max-width: 100%;

		&.horizontal {
			flex-direction: row;
		}

		&.vertical {
			flex-direction: column;
		}

		&.center {
			&.horizontal {
				div[data-dnditem] {
					// first child or if thats dragging (non-layout pos fixed)
					// then the next item in the list
					&:first-child,
					&:first-child.dragging + * {
						margin-left: auto;
					}
					&:last-child {
						margin-right: auto;
					}
				}

				:global(div[data-dndplaceholder]:first-child) {
					margin-left: auto;
				}
				:global(div[data-dndplaceholder]:last-child) {
					margin-right: auto;
				}
			}
		}
		:global(div[data-dndplaceholder]) {
			flex-shrink: 0;
			flex-grow: 0;
		}
	}

	div[data-dnditem] {
		position: relative;
		user-select: none;
		touch-action: none;
		flex-shrink: 0;
		flex-grow: 0;
	}

	:global(*[data-dndhandle]) {
		cursor: grab !important;
	}
</style>
