<svelte:options accessors={true} />

<script lang="ts">
	import type { Render } from '$lib/types.js';
	import { browser } from '$app/environment';
	import XMLNode from './XMLNode.svelte';

	/**
	 * Initialize the XML string.
	 */
	export let xml = '';

	/**
	 * Set renders.
	 */
	export let render: Record<string, () => Promise<{ default: Render }>> = {};

	/**
	 * Get the result SSML string.
	 * `undefined` if XML is invalid.
	 */
	export function result() {
		return root?.outerHTML;
	}

	let root = parse(xml);

	function parse(xml: string) {
		if (!browser) {
			return;
		}

		const parser = new DOMParser();
		const doc = parser.parseFromString(xml, 'text/xml');

		if (doc.querySelector('parsererror')) {
			return;
		}

		return doc.documentElement;
	}
</script>

{#if root}
	<div class="w-fit">
		<XMLNode {render} ancestors={[]} node={root} on:change />
	</div>
{:else}
	<span>Invalid XML</span>
{/if}
