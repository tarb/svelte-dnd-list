import type { DropZone } from './types';
import { Direction } from './types';

export default class VerticalDropZone implements DropZone {
	direction: Direction = Direction.Vertical;

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
		this.containerClass = 'vertical';
	}

	scrollContainer(x: number, y: number): void {
		const { el } = this;
		const b = el.getBoundingClientRect();

		const regionSize = b.height / 3;

		if (y > b.top && y < (b.top + regionSize)) {
			const dampening = ((y - b.top) / regionSize) * 10;
			el.scrollTop -= (10 - dampening);
		} else if (y < b.bottom && y > (b.bottom - regionSize)) {
			const dampening = ((b.bottom - y) / regionSize) * 10;
			el.scrollTop += (10 - dampening);
		}
	}

	pointIndex(x: number, y: number): number {
		const { el, itemSize, count } = this;

		const b = el.getBoundingClientRect();
		const top = b.top - el.scrollTop;
		const rawOver = Math.floor((y - top) / itemSize);

		return Math.min(Math.max(rawOver, 0), count);
	}

	placeholderStyleStr(): string {
		return `height: ${this.itemSize}px; width: 100%;`;
	}

	dragXOffset(index: number): number {
		const b = this.el.getBoundingClientRect();
		return b.left;
	}
	dragYOffset(index: number): number {
		const b = this.el.getBoundingClientRect();
		return (index * this.itemSize) + b.top - this.el.scrollTop;
	}

	itemHeight(): number {
		return this.itemSize;
	}
	itemWidth(): number {
		return this.el.clientWidth;
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
					(item.style.cssText = `transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
			} else if (raise) {
				if (transition) {
					item &&
						(item.style.cssText = `transform: translateY(${itemSize}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
				} else {
					// prevent the transition jump on first render
					item &&
						(item.style.cssText = `transform: translateY(${itemSize}px); height: ${itemSize}px;`);
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
				(items[
					i
				].style.cssText = `transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
		}
	}

	styleDestMove(index: number) {
		const { items, itemSize, el } = this;
		el.style.cssText = `transition: padding-bottom 0.2s cubic-bezier(0.2, 0, 0, 1); padding-bottom: ${itemSize}px;`;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];

			if (i < index) {
				item &&
					(item.style.cssText = `transform: translateY(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
			} else {
				item &&
					(item.style.cssText = `transform: translateY(${itemSize}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
			}
		}
	}

	styleDestReset() {
		const { items, itemSize, el } = this;		
		el.style.cssText = `transition: padding-bottom 0.2s cubic-bezier(0.2, 0, 0, 1); padding-bottom: 0px;`;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item &&
				(items[i].style.cssText = `transform:translateY(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); height: ${itemSize}px;`);
		}
	}

	styleRemove() {
		this.styleContainerBaseStyle();
	}

	styleContainerBaseStyle() {
		const { items, itemSize, el } = this;
		el.style.cssText = '';

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item && (item.style.cssText = `height: ${itemSize}px;`);
		}
	}
}
