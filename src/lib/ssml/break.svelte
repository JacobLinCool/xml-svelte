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

<span>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<code class="text-xs text-yellow-500 tooltip focus:font-bold" tabindex="0" data-tip={tip}
		>&lt;break&gt;</code
	>
</span>
