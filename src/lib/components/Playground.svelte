<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;

	let grid: { state: number; fadeLevel: number }[][] = [];

	function setupCanvas(canvas: HTMLCanvasElement) {
		handleResize(canvas);

		const renderingContext = canvas.getContext('2d');
		if (renderingContext) {
			context = renderingContext;
		} else {
			console.log('Rendering Context not found.');
		}

		canvas.style.background = '#000000';
	}

	function handleResize(canvas: HTMLCanvasElement) {
		if (!canvas) return;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		canvas.width = windowWidth;
		canvas.height = windowHeight;
	}

	const initializeGrid = (gridSizeX: number, gridSizeY: number) => {
		grid = Array.from({ length: gridSizeX }, () =>
			Array.from({ length: gridSizeY }, () => ({
				state: Math.random() > 0.5 ? 1 : 0,
				fadeLevel: 0
			}))
		);
	};

	onMount(() => {
		const canvasElement = document.getElementById('canvas');

		// window.addEventListener('resize', handleResize(canvas));

		if (canvasElement) {
			canvas = canvasElement as HTMLCanvasElement;
		} else {
			console.log('Canvas Element not found.');
		}

		setupCanvas(canvas);
	});
</script>

<canvas id="canvas"></canvas>
