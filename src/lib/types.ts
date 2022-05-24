export const enum Direction {
	Vertical,
	Horizontal
}
export const enum EventType {
	Programatic = 0,
	User = 1
}

export interface DropZoneConstuctable {
	new (id: string, count: number, priority: number, itemSize: number): DropZone;
}

export interface DropZone {
	id: string;
	priority: number;
	itemSize: number;
	count: number;
	el: HTMLDivElement;
	items: HTMLDivElement[];
	direction: Direction;
	containerClass: string;

	dragXOffset(index: number, count?: number): number;
	dragYOffset(index: number, count?: number): number;

	itemHeight(): number;
	itemWidth(): number;
	placeholderStyleStr(): string;

	insideBounding(x: number, y: number): boolean;
	pointIndex(x: number, y: number): number;
	styleSourceMove(hover: number, source: number, transition: boolean): void;
	styleSourceMissing(index: number): void;
	styleDestMove(overIndex: number): void;
	styleDestReset(): void;
	styleRemove(): void;
	styleContainerBaseStyle(): void;
}

export interface Destination {
	dropZoneID: string;
	index: number;
}

export interface DropEvent {
	from: Destination;
	to?: Destination;
}

export interface Dragging {
	type: EventType;

	sourceZone: DropZone;
	destZone?: DropZone;

	sourceIndex: number;
	hoverIndex?: number;

	placeholder: HTMLDivElement;
	el: HTMLDivElement;
	resetZones: Set<DropZone>;

	bounding: {
		dragTop: number;
		dragLeft: number;
		top: number;
		bottom: number;
		left: number;
		right: number;
		height: number;
		width: number;
	};

	onMoveResolve?: () => void;
}
