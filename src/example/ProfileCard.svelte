<svelte:options immutable={true} />

<script lang="ts">
	import type { Muppet } from './data';
	import { fly } from 'svelte/transition';

	export let data: Muppet;
	export let compact: boolean;
	export let dragging: boolean;
	export let onRemove: () => void = undefined;
</script>

<div class="card" class:compact class:dragging>
	<img data-dndhandle src={data?.image} alt={data?.name} />
	{#if !compact}
		<div class="details" transition:fly|local={{ x: -200, y: 0, opacity: 1, duration: 100 }}>
			<p class="name">{data?.name}</p>
			<a class="tag" href={`https://twitter.com/${data?.twitter}`}>{`@${data?.twitter}`}</a>

			<p class="stats">
				<bold>{Math.floor(data?.followers / 1000)}K</bold> Followers
			</p>
		</div>
		<button on:click={onRemove}>
			<svg height="1em" width="1em" viewBox="-2 -2 50 50" focusable="false" role="presentation">
				<path
					fill="currentColor"
					d="M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z"
				/>
			</svg>
		</button>
	{/if}
</div>

<style lang="scss">
	.card {
		--shadow-1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		--shadow-2: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
		--shadow-3: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

		position: relative;
		background: #ffffff;
		display: flex;
		overflow: hidden;
		transition: all 0.1s ease-in-out;
		border-radius: 4px;
		box-sizing: border-box;
		box-shadow: var(--shadow-1);
	}
	.dragging {
		box-shadow: var(--shadow-3);
	}
	.compact {
		border-radius: 50px;
		width: 95px;
		height: 95px;
		box-shadow: var(--shadow-2);
		button {
			display: none;
		}
	}

	img {
		width: 100px;
		height: 100px;
		z-index: 5;
	}
	button {
		position: absolute;
		font-size: 16px;
		top: 5px;
		right: 5px;
		opacity: 0.5;
		outline: none;
		background: none;
		border: none;

		&:hover {
			opacity: 1;
			cursor: pointer;
		}
	}

	.details {
		padding: 8px;

		p {
			margin: 0;
		}
		.name {
			font-weight: 500;
		}
		.tag {
			text-decoration: none;
			color: #323842;
			font-size: 12px;
			&:hover {
				text-decoration: underline;
			}
		}
		.stats {
			font-size: 12px;
			color: #323842;
			margin-top: 30px;
		}
	}
</style>
