<script lang="ts">
	export let node: Node;

	const tags = ['emphasis', 'break'];
	const color = {
		emphasis: ['text-purple-500', 'bg-purple-500'],
		break: ['text-yellow-500', 'bg-yellow-500']
	} as const;

	function fg(tag: string) {
		if (tag in color) {
			return color[tag as keyof typeof color][0];
		}
		return '';
	}

	function bg(tag: string) {
		if (tag in color) {
			return color[tag as keyof typeof color][1];
		}
		return '';
	}

	function attrs(node: Node) {
		if (!(node instanceof Element)) {
			return [];
		}

		const attrs: [attr: Attr, update: () => void][] = [];

		for (let i = 0; i < node.attributes.length; i++) {
			const attr = node.attributes[i];
			const update = () => {
				node.setAttribute(attr.name, attr.value);
			};
			attrs.push([attr, update]);
		}

		return attrs;
	}
</script>

<span>
	{#if node.nodeType !== node.TEXT_NODE && tags.includes(node.nodeName)}
		<span class="{bg(node.nodeName)} bg-opacity-10 p-1 rounded">
			<span class="select-none {fg(node.nodeName)}">
				&lt;
				{node.nodeName}
				{#each attrs(node) as [attr, update]}
					{' '}
					{attr.name}="<span
						class="border p-1 rounded text-sm"
						role="textbox"
						contenteditable
						bind:innerHTML={attr.value}
						on:input={() => update()}
					/>"
				{/each}
				&gt;
			</span>
			{#each node.childNodes as child}
				<svelte:self node={child} />
			{/each}
			<span class="select-none {fg(node.nodeName)}"> &lt;/&gt; </span>
		</span>
	{:else}
		<span
			class="border p-1 rounded"
			role="textbox"
			contenteditable
			bind:innerHTML={node.nodeValue}
		/>
	{/if}
</span>
