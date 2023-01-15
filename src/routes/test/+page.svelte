<script lang="ts">
	import Canvas from '$lib/components/Canvas/Canvas.svelte';
	let strokeWeight: number;

	function changeColor() {}
</script>

<Canvas {strokeWeight} />
<input bind:value={strokeWeight} />
<button on:click={changeColor} />
