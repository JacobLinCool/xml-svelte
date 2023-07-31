<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let ancestors: Element[];
	export let node: Node;

	const dispatch = createEventDispatcher<{ change: unknown }>();
</script>

<span contenteditable bind:innerHTML={node.textContent} on:input={() => dispatch('change')} />
