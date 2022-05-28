<!-- 
	This is a very simple example that shows basic dragging and dropping in a veritcal list.
 -->
<svelte:options immutable={true} />

<script lang="ts">
	import DragDropList, { VerticalDropZone, reorder, type DropEvent } from '$lib';

	let items = [1, 2, 3, 4, 5];

	function onDrop({ detail: { from, to } }: CustomEvent<DropEvent>) {
		if (!to || from === to) {
			return;
		}

		items = reorder(items, from.index, to.index);
	}
</script>

<h1>Svelte Dnd List - Simple Example</h1>

<DragDropList
	id="example"
	type={VerticalDropZone}
	itemSize={50}
	itemCount={items.length}
	on:drop={onDrop}
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
