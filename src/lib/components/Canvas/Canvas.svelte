<script lang="ts">
	import { onMount } from 'svelte';
	import Canvas from './Canvas';

	let container: HTMLDivElement;
	const width = 800;
	const height = 600;
	const backgroundColor = 'red';
	let canvas: Canvas;
	let tool: 'brush';
	export let strokeWeight: number;

	$: if (canvas) canvas.setTool(tool);
	$: if (canvas) canvas.setStrokeWeight(strokeWeight);
	onMount(() => {
		canvas = new Canvas({
			target: container,
			properties: {
				width: width,
				height: height
			}
		});
	});
</script>

<div
	bind:this={container}
	style:width="{width}px"
	style:height="{height}px"
	style:background-color={backgroundColor}
/>
