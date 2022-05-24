# Svelte Dnd List

A very lightweight, dependency free and simple drag and drop library for Svelte. The library supports multiple types of lists, and moving items between lists.

> It's still currently in development and as such its API is not stable and might change as development continues.

## Getting Started

Below is a very simple example that shows reordering the array of numbers in a vertical list. [You can play with this example here.](https://tarb.github.io/simple)

```svelte
<svelte:options immutable={true} />

<script lang="ts">
	import DragDropList, { VerticalDropZone, reorder, type DropEvent } from 'svelte-dnd-list';

	let items = [1, 2, 3, 4, 5];

	function onDrop({ from, to }: DropEvent) {
		if (!to) {
			return;
		}

		items = reorder(items, from.index, to.index);
	}
</script>

<DragDropList
	id="example"
	type={VerticalDropZone}
	itemSize={50}
	itemCount={items.length}
	{onDrop}
	let:index
>
	<div>{items[index]}</div>
</DragDropList>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		border: 1px solid black;
	}
</style>
```

## Full Featured Example

You can find a more featured example with multiple lists, item morphing and programmatic moving here. [Full example.](https://tarb.github.io/)