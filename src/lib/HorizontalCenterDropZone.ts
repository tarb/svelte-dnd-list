import type { DropZone } from './types';
import { Direction } from './types';
import { browser } from '$app/env'; 

export default class HorizontalCenterDropZone implements DropZone {
	direction: Direction = Direction.Horizontal;

	id: string;
	priority: number;
	itemSize: number;
	count: number;
	el: HTMLDivElement;
	items: HTMLDivElement[];
	containerClass: string;

	elWidth: number;
	ro: ResizeObserver;

	constructor(id: string, count: number, priority: number, itemSize: number) {
		this.id = id;
		this.priority = priority;
		this.count = count;
		this.itemSize = itemSize;
		this.items = new Array(count);
		this.el = undefined;
		this.ro = browser ? new ResizeObserver(this.onResize.bind(this)): undefined;
		this.containerClass = 'horizontal center';
	}

	onResize(entries: ResizeObserverEntry[]) {
		const w = entries[0].contentRect.width;
		this.elWidth = w;
	}

	placeholderStyleStr(): string {
		return `width: ${this.itemSize}px; height: 100%;`;
	}

	insideBounding(x: number, y: number): boolean {
		const b = this.el.getBoundingClientRect();
		return y > b.top && y < b.bottom && x > b.left && x < b.right;
	}

	pointIndex(x: number, y: number): number {
		const { el, itemSize, count } = this;
		const b = el.getBoundingClientRect();
		const left = b.left - el.scrollLeft;
		const top = b.top - el.scrollTop;

		x = x - left;
		y = y - top;

		const contentWidth = this.count * this.itemSize;
		let padding = 0;
		if (contentWidth < this.elWidth) {
			padding = Math.floor((this.elWidth - contentWidth) / 2);
		}

		const rawOver = Math.floor((x - padding) / itemSize);
		return Math.min(Math.max(rawOver, 0), count);
	}

	dragYOffset(index: number, count: number): number {
		return 0;
	}
	dragXOffset(index: number, count: number): number {
		const contentWidth = (count ?? this.count) * this.itemSize;
		if (contentWidth < this.elWidth) {
			const padding = (this.elWidth - contentWidth) / 2;
			return index * this.itemSize + padding;
		}

		return index * this.itemSize;
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
		const { count, itemSize, items, elWidth } = this;

		if (count * itemSize > elWidth && (count - 1) * itemSize < elWidth) {
			const tranX = Math.floor((elWidth - (count - 1) * itemSize) / 2) - 1;
			for (let i = 0; i < count; ++i) {
				const item = items[i];
				item &&
					i !== index &&
					(items[i].style.cssText = `transform: translateX(${tranX}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			}
		} else if ((count - 1) * itemSize < elWidth) {
			for (let i = 0; i < count; ++i) {
				const item = items[i];
				item &&
					i !== index &&
					(items[i].style.cssText = `transform: translateX(${
						itemSize / 2
					}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			}
		} else {
			for (let i = 0; i < count; ++i) {
				const item = items[i];
				item &&
					i !== index &&
					(items[i].style.cssText = `transform: translateX(0px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
			}
		}
	}

	styleDestMove(index: number) {
		const { items, count, itemSize, elWidth } = this;

		// padding, but not enough room for another 1
		if (count * itemSize < elWidth && (count + 1) * itemSize > elWidth) {
			const d = elWidth - count * itemSize; // (d > 0 && d < itemSize) === true
			const left = Math.floor(d / 2) - 1;
			const right = itemSize - left;

			for (let i = 0; i < count; ++i) {
				const item = items[i];

				if (i < index) {
					item &&
						(item.style.cssText = `transform: translateX(-${left}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
				} else {
					item &&
						(item.style.cssText = `transform: translateX(${right}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
				}
			}
		} else if (count * itemSize < elWidth) {
			for (let i = 0; i < count; ++i) {
				const item = items[i];

				if (i < index) {
					item &&
						(item.style.cssText = `transform: translateX(-${
							itemSize / 2
						}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
				} else {
					item &&
						(item.style.cssText = `transform: translateX(${
							itemSize / 2
						}px); transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
				}
			}
		} else {
			for (let i = 0; i < count; ++i) {
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
	}

	styleDestReset() {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item &&
				(items[
					i
				].style.cssText = `transform:translateX(0px); transition:transform 0.2s cubic-bezier(0.2, 0, 0, 1); width: ${itemSize}px;`);
		}
	}

	styleRemove() {
		const { items, itemSize } = this;

		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item && (item.style.cssText = `width: ${itemSize}px;`);
		}
	}

	styleContainerBaseStyle() {
		this.ro.observe(this.el);
		this.elWidth = this.el.clientWidth;

		const { items, itemSize } = this;
		for (let i = 0; i < items.length; ++i) {
			const item = items[i];
			item && (item.style.cssText = `width: ${itemSize}px;`);
		}
	}
}
