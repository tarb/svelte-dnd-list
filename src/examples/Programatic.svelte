<svelte:options immutable={true} />

<!-- 
	This is a simple example that shows programatically moving draggable items within and between lists.
 -->
<script lang="ts">
	import DragDropList, { HorizontalDropZone, type DropEvent } from '$lib';
	import ProgramaticCard from './ProgramaticCard.svelte';

	let alist: DragDropList;
	let blist: DragDropList;

	let colors1 = ['cyan', 'blue', 'green', 'lime'];
	let colors2 = ['yellow', 'orange', 'red', 'pink'];

	function onDrop({ detail: { from, to } }: CustomEvent<DropEvent>) {
		if (!to || from === to) {
			return;
		}

		// pickup
		let moving: string;
		if (from.dropZoneID === 'a') {
			colors1 = [...colors1];
			[moving] = colors1.splice(from.index, 1);
		} else if (from.dropZoneID === 'b') {
			colors2 = [...colors2];
			[moving] = colors2.splice(from.index, 1);
		}

		// place
		if (to.dropZoneID === 'a') {
			colors1 = [...colors1];
			colors1.splice(to.index, 0, moving);
		} else if (to.dropZoneID === 'b') {
			colors2 = [...colors2];
			colors2.splice(to.index, 0, moving);
		}
	}
</script>

<h1>Svelte Dnd List - Programatic Example</h1>

<DragDropList
	bind:this={alist}
	id="a"
	zoneClass="zone"
	type={HorizontalDropZone}
	itemSize={80}
	itemCount={colors1.length}
	keyFn={(i) => colors1[i]}
	on:drop={onDrop}
	let:index
>
	<ProgramaticCard
		color={colors1[index]}
		on:right={() => index < colors1.length - 1 && alist.move(index, index + 1, alist.dropzone)}
		on:left={() => index > 0 && alist.move(index, index - 1, alist.dropzone)}
		on:down={() => alist.move(index, Math.min(index, colors2.length), blist.dropzone)}
	/>
</DragDropList>

<DragDropList
	bind:this={blist}
	id="b"
	zoneClass="zone"
	type={HorizontalDropZone}
	itemSize={80}
	itemCount={colors2.length}
	keyFn={(i) => colors2[i]}
	on:drop={onDrop}
	let:index
>
	<ProgramaticCard
		color={colors2[index]}
		on:right={() => index < colors2.length - 1 && blist.move(index, index + 1, blist.dropzone)}
		on:left={() => index > 0 && blist.move(index, index - 1, blist.dropzone)}
		on:up={() => blist.move(index, Math.min(index, colors1.length), alist.dropzone)}
	/>
</DragDropList>

<style>
	/* for the zone to hold its height when empty */
	:global(.zone) {
		min-height: 80px;
	}
</style>
