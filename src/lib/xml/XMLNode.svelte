<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Render } from '$lib/types.js';

	export let ancestors: HTMLElement[];
	export let node: Node;
	export let render: Record<string, () => Promise<{ default: Render }>>;

	const dispatch = createEventDispatcher<{ change: Node }>();

	let R = select_render();

	function select_render() {
		const name = node.nodeName.toLowerCase();
		const R = render[name] || render['*'];

		if (!R) {
			return;
		}

		return (
			R as () => Promise<{
				default: Render;
			}>
		)().then(({ default: R }) => R);
	}
</script>

{#if R}
	{#await R then r}
		<svelte:component
			this={r}
			{node}
			ancestors={[...ancestors]}
			on:change={() => dispatch('change', node)}
		>
			{#each node.childNodes as child}
				<svelte:self {render} node={child} ancestors={[...ancestors, node]} on:change />
			{/each}
		</svelte:component>
	{/await}
{:else}
	<span class="text-error">
		Error, no render for <code>{node.nodeName}</code>
	</span>
{/if}
