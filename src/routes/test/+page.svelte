<script lang="ts">
	import Canvas from '$lib/components/Canvas/Canvas.svelte';
	let color: string;
</script>

<Canvas {color} />
<input bind:value={color} />
