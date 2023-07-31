<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let ancestors: Element[];
	export let node: Node;

	const dispatch = createEventDispatcher<{ change: never }>();
</script>

<div>
	<slot />
</div>
