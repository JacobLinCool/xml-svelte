<script lang="ts">
	import { XML } from '$lib/index.js';
	import '../app.css';

	let xml =
		'<speak>Hello! My name is Jacob. <prosody rate="slow">I am studying <emphasis level="strong">Computer <break time="1s" /> Science</emphasis>. I am a <emphasis level="moderate">Software Engineer</emphasis>.</prosody></speak>';

	let result = xml;

	const render = {
		speak: () => import('$lib/ssml/speak.svelte'),
		emphasis: () => import('$lib/ssml/emphasis.svelte'),
		prosody: () => import('$lib/ssml/prosody.svelte'),
		break: () => import('$lib/ssml/break.svelte'),
		'#text': () => import('$lib/ssml/content.svelte')
	};

	let editor: XML;

	function update(evt: CustomEvent<Node>) {
		console.log('update happened', evt.detail);

		const out = editor.result();
		if (out) {
			result = out;
		} else {
			result = 'Invalid XML';
		}
	}
</script>

<div class="h-full w-full flex flex-col justify-center items-center gap-4 p-4">
	<XML bind:this={editor} {xml} {render} on:change={update} />

	<div class="prose"><code>{result}</code></div>
</div>
