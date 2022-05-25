import type { DropZone } from './types';
import { Direction } from './types';

export default class HorizontalDropZone implements DropZone {
	direction: Direction = Direction.Horizontal;

	id: string;
	priority: number;
	itemSize: number;
	count: number;
	el: HTMLDivElement;
	items: HTMLDivElement[];
	containerClass: string;

	constructor(id: string, count: number, priority: number, itemSize: number) {
		this.id = id;
		this.priority = priority;
		this.count = count;
		this.itemSize = itemSize;
		this.items = new Array(count);
		this.el = undefined;
		this.containerClass = 'horizontal';
	}

	insideBounding(x: number, y: number): boolean {
		const el = this.el;
		
		let scrollTop = 0, scrollLeft = 0;
		for (let e = el as HTMLElement; e; e = e.parentElement) {
			scrollLeft += e.scrollLeft;
			scrollTop += e.scrollTop;
		}

		const b = el.getBoundingClientRect();
		const left = b.left + scrollLeft;
		const right = b.right + scrollLeft;
		const top = b.top + scrollTop;
		const bottom = b.bottom + scrollTop;

		return y > top && y < bottom && x > left && x < right;
	}

	pointIndex(x: number, y: number): number {
		const { el, itemSize, count } = this;
		
		const b = el.getBoundingClientRect();
		const left = b.left - el.scrollLeft + window.scrollX;
		const rawOver = Math.floor((x - left) / itemSize);

		return Math.min(Math.max(rawOver, 0), count);
	}

	placeholderStyleStr(): string {
		return `width: ${this.itemSize}px; height: 100%;`;
	}

	dragXOffset(index: number): number {
		const b = this.el.getBoundingClientRect();
		return (index * this.itemSize) + b.left ;
	}
	dragYOffset(index: number): number {
		const b = this.el.getBoundingClientRect();
		return b.top;
	}

	itemHeight(): number {
		return this.el.clientHeight;
	}
	itemWidth(): number {
		return this.itemSize;
	}

	styleSourceMove(hover: number, source: number, transition: boolean) {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			// move element to base
			const base =
				(hover > source && (i < source || (i > source && i <= hover))) ||
				(hover < source && i < hover) ||
				(hover == source && i < source);
			// move element down
			const raise =
				(hover > source && i > hover) ||
				(hover < source && ((i >= hover && i < source) || i > source)) ||
				(hover == source && i > source);

			const item = items[i];
			if (base) {
				item &&
					(item.style.cssText = `transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			} else if (raise) {
				if (transition) {
					item &&
						(item.style.cssText = `transform: translateX(${itemSize}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
				} else {
					// prevent the transition jump on first render
					item &&
						(item.style.cssText = `transform: translateX(${itemSize}px); width: ${itemSize}px;`);
				}
			}
		}
	}

	styleSourceMissing(index: number) {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item &&
				i !== index &&
				(items[i].style.cssText = `transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
		}
	}

	styleDestMove(index: number) {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];

			if (i < index) {
				item &&
					(item.style.cssText = `transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			} else {
				item &&
					(item.style.cssText = `transform: translateX(${itemSize}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			}
		}
	}

	styleDestReset() {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item &&
				(items[i].style.cssText = `transform:translateX(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
		}
	}

	styleRemove() {
		this.styleContainerBaseStyle();
	}

	styleContainerBaseStyle() {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item && (item.style.cssText = ` width: ${itemSize}px;`);
		}
	}
}
