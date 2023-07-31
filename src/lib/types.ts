import type { ComponentType, SvelteComponent } from 'svelte';

export type Render = ComponentType<
	SvelteComponent<
		{
			ancestors: Element[];
			node: Node;
			[key: string]: unknown;
		},
		{
			change: CustomEvent<unknown>;
			[key: string]: unknown;
		}
	>
>;
