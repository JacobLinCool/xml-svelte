<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let ancestors: Element[];
	export let node: Node;

	const dispatch = createEventDispatcher<{ change: never }>();

	const tip = create_tip();

	function create_tip() {
		if (!(node instanceof Element)) {
			return '';
		}

		let tip = '';
		for (const attr of node.attributes) {
			tip += `${attr.name}="${attr.value}" `;
		}

		return tip.trim();
	}
</script>

<span class="inline-block">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<code class="text-xs text-pink-700 tooltip peer focus:font-bold" tabindex="0" data-tip={tip}
		>&lt;prosody&gt;</code
	>
	<div
		class="absolute -bottom-0.5 left-0 w-full h-0.5 bg-pink-700 bg-opacity-40 transition-all peer-hover:h-full peer-hover:bottom-0 peer-hover:bg-opacity-20 peer-focus:h-full peer-focus:bottom-0 peer-focus:bg-opacity-20 peer-focus:animate-pulse pointer-events-none"
	/>
	<slot />
</span>
