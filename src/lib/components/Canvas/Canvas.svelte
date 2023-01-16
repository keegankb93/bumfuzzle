<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import Canvas from './Canvas';
	import type Tool from './Tool';
	import type Brush from './Brush';
	import Fill from './Fill';

	let container: HTMLDivElement;
	const width = 800;
	const height = 600;
	let canvas: Canvas;
	let tool: 'brush' = 'brush';
	export let color: string = 'black';

	$: if (canvas) {
		canvas.selectTool(tool);
	}

	$: if (canvas) {
		canvas.currentColor = color;
		console.log(canvas.currentColor);
		canvas.updateSelectedToolProperties();
	}

	function fill() {
		new Fill(canvas.node);
	}

	onMount(() => {
		canvas = new Canvas({
			target: container,
			properties: {
				width: width,
				height: height
			}
		});

		canvas.selectTool(tool);
	});
</script>

<div bind:this={container} style:width="{width}px" style:height="{height}px" />
<button on:click={fill}>Fill</button>
