<svelte:options immutable={true} />

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let color: string;

	const dispatch = createEventDispatcher();
</script>

<div class={`card ${color}`}>
	<button class="up" on:click={() => dispatch('up')}>
		<svg viewBox="0 0 24 24"
			><path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
		</svg>
	</button>
	<button class="left" on:click={() => dispatch('left')}>
		<svg viewBox="0 0 24 24"
			><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
		</svg>
	</button>
	<button class="right" on:click={() => dispatch('right')}>
		<svg viewBox="0 0 24 24"
			><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
		</svg>
	</button>
	<button class="down" on:click={() => dispatch('down')}>
		<svg viewBox="0 0 24 24"
			><path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
		</svg>
	</button>
</div>

<style lang="scss">
	.card {
		--shadow-1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		--shadow-2: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		--shadow-3: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

		position: relative;
		box-shadow: var(--shadow-1);
		outline: 1px black solid;
		cursor: grab;
		width: 80px;
		height: 80px;

		&.pink {
			background-color: #c47ada;
		}
		&.cyan {
			background-color: #90baee;
		}
		&.blue {
			background-color: #75bafa;
		}
		&.green {
			background-color: #72d5bf;
		}
		&.lime {
			background-color: #73de8c;
		}
		&.yellow {
			background-color: #fbe66e;
		}
		&.orange {
			background-color: #f5b969;
		}
		&.red {
			background-color: #e06c75;
		}
	}
	.dragging {
		box-shadow: var(--shadow-3);
	}
	button {
		position: absolute;
		background: transparent;
		display: block;
		width: 33%;
		height: 33%;
		border: none;
		outline: none;
		cursor: pointer;

		&.up {
			top: 0;
			bottom: 33%;
			left: 33%;
			right: 33%;
		}
		&.down {
			bottom: 0;
			top: 67%;
			left: 33%;
			right: 83%;
		}
		&.right {
			right: 0;
			bottom: 67%;
			left: 67%;
			top: 33%;
		}
		&.left {
			left: 0;
			bottom: 33%;
			right: 33%;
			right: 33%;
		}
	}
</style>
