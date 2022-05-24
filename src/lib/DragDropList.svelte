<svelte:options immutable={true} />

<script lang="ts" context="module">
	const HANDLE_SELECTOR = '[data-dndhandle]';
	const dropzones = new Array<DropZone>();

	let down = false;
	let raf: number | undefined; // animation frame
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Direction, EventType } from './types';
	import type { Dragging, DropEvent, DropZone, Destination, DropZoneConstuctable } from './types';

	export let id: string;
	export let itemCount: number;
	export let itemSize: number;
	export let type: DropZoneConstuctable;
	export let onDrop: (ev: DropEvent) => void;

	export let priority = 1;
	export let itemClass = '';
	export let zoneClass = '';
	export let keyFn: (index: number) => any = i => i;
	export let useHandle = false;

	export const dropzone: DropZone = new type(id, priority, itemCount, itemSize);
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

		// set up drag
		down = true;
		document.addEventListener('mousemove', onDrag);
		document.addEventListener('mouseup', onDragEnd);
		document.body.style.cursor = 'grabbing';

		const el = dropzone.items[index];
		const br = el.getBoundingClientRect();

		const placeholder = document.createElement('div');
		placeholder.style.cssText = dropzone.placeholderStyleStr();
		placeholder.setAttribute('data-dndplaceholder', '');
		dropzone.el.appendChild(placeholder);

		if (dragging !== undefined) {
			finalizeDrag();
		}

		dragging = {
			type: EventType.User,
			el,
			placeholder,
			resetZones: new Set([dropzone]),
			sourceIndex: index,
			hoverIndex: undefined,
			sourceZone: dropzone,
			destZone: dropzone,
			bounding: {
				dragLeft: e.pageX - br.left,
				dragTop: e.pageY - br.top,
				left: br.left,
				top: br.top,
				bottom: br.bottom,
				right: br.right,
				height: br.height,
				width: br.width
			},
			onMoveResolve: undefined
		};

		// fire off a move event
		onDrag(e);
	}

	function onDrag(e: MouseEvent) {
		if (down) {
			if (raf) {
				cancelAnimationFrame(raf);
			}
			raf = requestAnimationFrame(() => {
				raf = undefined;

				const drag = dragging;
				const { el, sourceZone, sourceIndex, bounding } = drag;

				// use the mouse position, or element center to decide whether the item is over a dropzone
				// const dragBounding = el.getBoundingClientRect();
				const x = e.pageX //- bounding.dragLeft + dragBounding.width / 2; // middle point for item
				const y = e.pageY //- bounding.dragTop + dragBounding.height / 2; // middle point for item

				const tx =
					e.clientX -
					(bounding.dragLeft + bounding.left) +
					-sourceZone.el.scrollLeft +
					sourceZone.dragXOffset(sourceIndex);

				const ty =
					e.clientY -
					(bounding.dragTop + bounding.top) +
					-sourceZone.el.scrollTop +
					sourceZone.dragYOffset(sourceIndex);

				let dest = findDropZone(x, y);
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

					const hoverIndex = dest.pointIndex(x, y);
					if (hoverIndex !== drag.hoverIndex || enteredZone) {
						dest.styleSourceMove(hoverIndex, sourceIndex, drag.hoverIndex !== undefined);
						dragging = {
							...dragging,
							hoverIndex: hoverIndex,
							destZone: dest
						};
					}

					el.style.cssText = `z-index:1000; pointer-events:none; cursor:grabbing; height:${sourceZone.itemHeight()}px; width:${sourceZone.itemWidth()}px; transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1); position:fixed; transform:translate(${tx}px,${ty}px)`;
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
						const hoverIndex = dest.pointIndex(x, y);
						if (hoverIndex !== drag.hoverIndex || enteredZone) {
							dest.styleDestMove(hoverIndex);
							dragging = {
								...dragging,
								hoverIndex: hoverIndex,
								destZone: dest
							};
						}

						el.style.cssText = `z-index:1000; pointer-events: none; cursor:grabbing; position:fixed; height:${dest.itemHeight()}px; width:${dest.itemWidth()}px; transition: height 0.2s cubic-bezier(0.2, 0, 0, 1); transform:translate(${tx}px,${ty}px); transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;
					} else {
						// style the dragging element - it keeps its source dimensions as its not inside a drop zone

						// first render out of a dropzone, update dragging
						if (enteredZone) {
							dragging = {
								...dragging,
								hoverIndex: -1,
								destZone: undefined
							};
						}

						el.style.cssText = `z-index:1000; pointer-events:none; cursor:grabbing; position:fixed; transform:translate(${tx}px,${ty}px); height:${drag.sourceZone.itemHeight()}px; width:${drag.sourceZone.itemWidth()}px;  transition:height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;
					}
				}
			});
		}
	}

	function onDragEnd(e: any) {
		// type?
		if (!down) {
			return;
		}
		down = false;

		if (raf) {
			cancelAnimationFrame(raf);
		}

		const { el, destZone, sourceZone, sourceIndex } = dragging;
		const hoverIndex = dragging.hoverIndex ?? sourceIndex;

		el.addEventListener('transitionend', finalizeDrag);
		document.removeEventListener('mousemove', onDrag);
		document.removeEventListener('mouseup', onDragEnd);
		document.body.style.cursor = '';

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

			tx =
				sourceZone.dragXOffset(hoverIndex + widthLastOffset) -
				sourceZone.el.scrollLeft -
				window.scrollX;
			ty =
				sourceZone.dragYOffset(hoverIndex + heightLastOffset) -
				sourceZone.el.scrollTop -
				window.scrollY;

			height = sourceZone.itemHeight();
			width = sourceZone.itemWidth();
			// detect when a transitionEnd event wont fire as the transition is already in the
			// finishing position
			forceFinal =
				el.style.transform === `translate(${tx}px, ${ty}px)` || el.style.transform === '';
		} else if (destZone !== undefined) {
			const destBox = destZone.el.getBoundingClientRect();
			const sourceBox = sourceZone.el.getBoundingClientRect();
			tx =
				destBox.left -
				sourceBox.left +
				destZone.dragXOffset(hoverIndex, destZone.count + 1) -
				destZone.el.scrollLeft -
				window.scrollX;
			ty =
				destBox.top -
				sourceBox.top +
				destZone.dragYOffset(hoverIndex, destZone.count + 1) -
				destZone.el.scrollTop -
				window.scrollY;
			height = destZone.itemHeight();
			width = destZone.itemWidth();
		} else {
			tx = sourceZone.dragXOffset(sourceIndex) - sourceZone.el.scrollLeft - window.scrollX;
			ty = sourceZone.dragYOffset(sourceIndex) - sourceZone.el.scrollTop - window.scrollY;
			height = sourceZone.itemHeight();
			width = sourceZone.itemWidth();

			sourceZone.styleSourceMove(sourceIndex, sourceIndex, true);
		}

		el.style.cssText = `z-index:1000; position:fixed; height:${height}px; width:${width}px; transform:translate(${tx}px,${ty}px); transition:transform 0.2s cubic-bezier(0.2,0,0,1), height 0.2s cubic-bezier(0.2, 0, 0, 1), width 0.2s cubic-bezier(0.2, 0, 0, 1);`;

		// if a force was detected as needed, fire it off here
		if (forceFinal) {
			finalizeDrag();
		}
	}

	function finalizeDrag(ev?: TransitionEvent) {
		const { el, destZone, sourceZone, sourceIndex, resetZones, placeholder } = dragging;
		const hoverIndex = dragging.hoverIndex ?? sourceIndex; // if no drag action took place hover may be undef

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
			? { dropZoneID: destZone.id, index: hoverIndex }
			: undefined;

		onDrop({ from, to });
		// dispatchEvent("drop", { from, to } as DropEvent);
		sourceZone.el.removeChild(placeholder);

		resetZones.forEach((zone) => zone.styleRemove());
		el.removeEventListener('transitionend', finalizeDrag);

		dragging.onMoveResolve?.();
		dragging = undefined;
	}

	export async function move(srcIndex: number, destIndex: number, destZone: DropZone, transitionDur: number = 500) {
		return new Promise<void>((resolve, reject) => {
			if (dragging !== undefined) {
				resolve();
				return;
			}

			const el = dropzone.items[srcIndex];
			if (!el) {
				resolve();
				return;
			}

			{
				const tx = /*bounding.left - dropzone.el.scrollLeft +*/ dropzone.dragXOffset(srcIndex);
				const ty = /*bounding.top - dropzone.el.scrollTop +*/ dropzone.dragYOffset(srcIndex);
				const height = dropzone.itemHeight();
				const width = dropzone.itemWidth();

				el.style.cssText = `z-index:1000; height:${height}px; width:${width}px; position:fixed; transform:translate(${tx}px,${ty}px)`;
			}

			// add placeholder, and style the moving element - pulling out out of flow
			const placeholder = document.createElement('div');
			placeholder.style.cssText = dropzone.placeholderStyleStr();
			placeholder.setAttribute('data-dndplaceholder', '');
			dropzone.el.appendChild(placeholder);

			// style the containers
			dropzone.styleSourceMove(srcIndex, srcIndex, false);
			setTimeout(() => {
				dragging?.type === EventType.Programatic && dropzone.styleSourceMissing(srcIndex);
			}, transitionDur * 0.4);
			destZone.styleDestMove(destIndex);

			const br = el.getBoundingClientRect();

			dragging = {
				type: EventType.Programatic,
				el,
				placeholder,
				resetZones: new Set([dropzone, destZone]),
				sourceIndex: srcIndex,
				hoverIndex: destIndex,
				sourceZone: dropzone,
				destZone: destZone,
				bounding: {
					dragLeft: 0,
					dragTop: 0,
					left: br.left,
					top: br.top,
					bottom: br.bottom,
					right: br.right,
					height: br.height,
					width: br.width
				},
				onMoveResolve: resolve
			};

			// style the moving element
			{
				const sourceBox = dropzone.el.getBoundingClientRect();
				const destBox = destZone.el.getBoundingClientRect();

				const tx =
					destBox.left -
					sourceBox.left +
					destZone.dragXOffset(destIndex, destZone.count + 1) -
					destZone.el.scrollLeft;
				const ty =
					destBox.top -
					sourceBox.top +
					destZone.dragYOffset(destIndex, destZone.count + 1) -
					destZone.el.scrollTop;
				const height = destZone.itemHeight();
				const width = destZone.itemWidth();

				el.style.cssText = `
                z-index: 1000; 
                position: fixed; 
                height: ${height}px; 
                width: ${width}px; 
                transform: translate(${tx}px,${ty}px); 
                transition:
                    transform ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
                    height ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1), 
                    width ${transitionDur}ms cubic-bezier(0.2, 0, 0, 1);`;
			}

			el.addEventListener('transitionend', finalizeDrag);
		});
	}
</script>

<div data-dndzone class={`${zoneClass} ${dropzone.containerClass}`} bind:this={dropzone.el}>
	{#each items as _, i (keyFn(i))}
		<div
			data-dnditem
			class={`${itemClass} ${
				dragging?.sourceIndex === i
					? `dragging ${dragging.type === EventType.User ? 'user' : 'prog'}`
					: ''
			}`}
			style={`${dropzone.direction === Direction.Vertical ? 'height' : 'width'}: ${itemSize}px;`}
			bind:this={dropzone.items[i]}
			on:mousedown={(e) => onMouseDown(e, i)}
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
		flex-shrink: 0;
		flex-grow: 0;
	}

	:global(*[data-dndhandle]) {
		cursor: grab !important;
	}
</style>