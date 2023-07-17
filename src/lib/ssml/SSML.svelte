<svelte:options accessors={true} />

<script lang="ts">
	import { browser } from '$app/environment';
	import SSMLNode from './SSMLNode.svelte';

	/**
	 * Initialize the SSML string.
	 */
	export let ssml = '';
	/**
	 * Whether to display the raw SSML string or the formatted SSML.
	 */
	export let raw = false;

	/**
	 * Get the result SSML string.
	 */
	export function result() {
		return root?.innerHTML;
	}

	let root = parse(`<speak>${ssml}</speak>`);

	function parse(ssml: string) {
		if (!browser) {
			return;
		}

		const parser = new DOMParser();
		const doc = parser.parseFromString(ssml, 'text/xml');

		if (doc.querySelector('parsererror')) {
			return;
		}

		return doc.documentElement;
	}
</script>

{#if root}
	{#if raw}
		<span>{root.innerHTML}</span>
	{:else}
		<div class="w-fit">
			{#each root.childNodes as node}
				<SSMLNode {node} />
			{/each}
		</div>
	{/if}
{:else}
	<span>Invalid SSML</span>
{/if}
