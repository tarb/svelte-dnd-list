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

	pointIndex(x: number, y: number): number {
		const { el, itemSize, count } = this;

		const b = el.getBoundingClientRect();
		const top = b.top - el.scrollTop + window.scrollY;
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
		return (index * this.itemSize) + b.top;
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
		const { items, itemSize } = this;

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
		const { items, itemSize } = this;

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
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item && (item.style.cssText = `height: ${itemSize}px;`);
		}
	}
}
