<svelte:options immutable={true} />

<script lang="ts">
	import DragDropList, {
		HorizontalCenterDropZone,
		VerticalDropZone,
		type DropEvent,
		type Dragging
	} from '$lib';
	import data, { type Muppet } from './data';
	import MuppetCard from './MuppetCard.svelte';

	let poolList: DragDropList;
	let tierSList: DragDropList;
	let tierAList: DragDropList;
	let tierBList: DragDropList;
	let tierCList: DragDropList;

	const [kermit, piggy, fozzie, elmo] = data.splice(0, 4);

	let pool: Muppet[] = data;
	let tierS: Muppet[] = [kermit];
	let tierA: Muppet[] = [piggy];
	let tierB: Muppet[] = [fozzie];
	let tierC: Muppet[] = [elmo];

	const shouldCompact = (drag: Dragging | undefined, def: boolean): boolean =>
		drag ? drag.destZone === undefined || drag.destZone.id === 'pool' : def;

	function onDrop({ detail: { from, to } }: CustomEvent<DropEvent>) {
		if (!to || from === to) {
			return;
		}

		// pickup
		let moving: Muppet;
		if (from.dropZoneID === 'pool') {
			pool = [...pool];
			[moving] = pool.splice(from.index, 1);
		} else if (from.dropZoneID === 'tierS') {
			tierS = [...tierS];
			[moving] = tierS.splice(from.index, 1);
		} else if (from.dropZoneID === 'tierA') {
			tierA = [...tierA];
			[moving] = tierA.splice(from.index, 1);
		} else if (from.dropZoneID === 'tierB') {
			tierB = [...tierB];
			[moving] = tierB.splice(from.index, 1);
		} else if (from.dropZoneID === 'tierC') {
			tierC = [...tierC];
			[moving] = tierC.splice(from.index, 1);
		}

		// place
		if (to.dropZoneID === 'pool') {
			pool = [...pool];
			pool.splice(to.index, 0, moving);
		} else if (to.dropZoneID === 'tierS') {
			tierS = [...tierS];
			tierS.splice(to.index, 0, moving);
		} else if (to.dropZoneID === 'tierA') {
			tierA = [...tierA];
			tierA.splice(to.index, 0, moving);
		} else if (to.dropZoneID === 'tierB') {
			tierB = [...tierB];
			tierB.splice(to.index, 0, moving);
		} else if (to.dropZoneID === 'tierC') {
			tierC = [...tierC];
			tierC.splice(to.index, 0, moving);
		}
	}

	async function clear() {
		const [s, a, b, c] = [tierS.length, tierA.length, tierB.length, tierC.length];
		for (let index = 0; index < c; ++index) await tierCList.move(0, 0, poolList.dropzone, 100);
		for (let index = 0; index < b; ++index) await tierBList.move(0, 0, poolList.dropzone, 100);
		for (let index = 0; index < a; ++index) await tierAList.move(0, 0, poolList.dropzone, 100);
		for (let index = 0; index < s; ++index) await tierSList.move(0, 0, poolList.dropzone, 100);
	}
</script>

<div class="root">
	<div class="description">
		<h1>Svelte Dnd List - Muppet Tier Example</h1>
		<button on:click={clear}> Reset </button>
	</div>

	<div class="pool">
		<DragDropList
			bind:this={poolList}
			itemCount={pool.length}
			id="pool"
			type={HorizontalCenterDropZone}
			itemSize={100}
			keyFn={(i) => pool[i].name}
			on:drop={onDrop}
			let:index
			let:drag
		>
			<MuppetCard
				data={pool[index]}
				dragging={drag?.sourceIndex === index}
				compact={shouldCompact(drag, true)}
			/>
		</DragDropList>
	</div>

	<div class="tier-lists">
		<div class="tier-list c">
			<p>C Tier</p>
			<DragDropList
				bind:this={tierCList}
				itemCount={tierC.length}
				id="tierC"
				useHandle
				type={VerticalDropZone}
				itemSize={100}
				on:drop={onDrop}
				keyFn={(i) => tierC[i].name}
				let:index
				let:drag
			>
				<MuppetCard
					data={tierC[index]}
					compact={shouldCompact(drag, false)}
					dragging={drag?.sourceIndex === index}
					onRemove={() => tierCList.move(index, 0, poolList.dropzone)}
				/>
			</DragDropList>
		</div>
		<div class="tier-list b">
			<p>B Tier</p>
			<DragDropList
				bind:this={tierBList}
				itemCount={tierB.length}
				id="tierB"
				useHandle
				type={VerticalDropZone}
				itemSize={100}
				on:drop={onDrop}
				keyFn={(i) => tierB[i].name}
				let:index
				let:drag
			>
				<MuppetCard
					data={tierB[index]}
					compact={shouldCompact(drag, false)}
					dragging={drag?.sourceIndex === index}
					onRemove={() => tierBList.move(index, 0, poolList.dropzone)}
				/>
			</DragDropList>
		</div>
		<div class="tier-list a">
			<p>A Tier</p>
			<DragDropList
				bind:this={tierAList}
				itemCount={tierA.length}
				id="tierA"
				useHandle
				type={VerticalDropZone}
				itemSize={100}
				on:drop={onDrop}
				keyFn={(i) => tierA[i].name}
				let:index
				let:drag
			>
				<MuppetCard
					data={tierA[index]}
					compact={shouldCompact(drag, false)}
					dragging={drag?.sourceIndex === index}
					onRemove={() => tierAList.move(index, 0, poolList.dropzone)}
				/>
			</DragDropList>
		</div>
		<div class="tier-list s">
			<p>S Tier</p>
			<DragDropList
				bind:this={tierSList}
				itemCount={tierS.length}
				id="tierS"
				useHandle
				type={VerticalDropZone}
				itemSize={100}
				on:drop={onDrop}
				keyFn={(i) => tierS[i].name}
				let:index
				let:drag
			>
				<MuppetCard
					data={tierS[index]}
					compact={shouldCompact(drag, false)}
					dragging={drag?.sourceIndex === index}
					onRemove={() => tierSList.move(index, 0, poolList.dropzone)}
				/>
			</DragDropList>
		</div>
	</div>
</div>

<style lang="scss">
	:root {
		background: #f9f9f9;
		font-family: sans-serif;
	}

	.root {
		width: 1260px;
		margin: 0 auto;
	}

	.pool {
		height: 100px;
		margin-bottom: 20px;
		width: 100%;
		overflow: scroll;
	}
	.tier-lists {
		display: flex;
		flex-direction: row;
		height: 700px;
		justify-content: center;
		gap: 15px;
	}

	.tier-list {
		min-width: 300px;
		padding: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		background-color: white;

		p {
			text-align: center;
			font-size: 18px;
			font-weight: 600;
		}
	}
</style>
