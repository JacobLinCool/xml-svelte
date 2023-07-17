<script lang="ts">
	import SSML from '$lib/ssml/SSML.svelte';
	import '../app.css';

	let ssml =
		'Hello! My name is Jacob. I am studying <emphasis>Computer <break time="1s" /> Science</emphasis>. I am a <emphasis>Software Engineer</emphasis>.';
	let raw = false;
</script>

<div class="h-full w-full flex flex-col justify-center items-center gap-4 p-4">
	<select class="select select-ghost" bind:value={raw}>
		<option value={false}>Formatted</option>
		<option value={true}>Raw</option>
	</select>

	<SSML {ssml} {raw} />
</div>
