<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	type EChartsOption = echarts.EChartsOption;

	const { options } = $props<{ options: EChartsOption }>();

	let chart: echarts.ECharts | null = null;
	let container: HTMLDivElement;
	let resizeObserver: ResizeObserver;

	function logContainerSize(label: string) {
		if (container) {
			console.log(`${label} - container size:`, {
				width: container.clientWidth,
				height: container.clientHeight
			});
		} else {
			console.log(`${label} - container is undefined`);
		}
	}

	function initChart() {
		logContainerSize('initChart');
		if (container && container.clientWidth > 0 && container.clientHeight > 0) {
			console.log('Initializing chart...');
			chart = echarts.init(container);
			chart.setOption(options);
			window.addEventListener('resize', chartResizeHandler);
		} else {
			console.warn('Chart not initialized: container has no size.');
		}
	}

	function chartResizeHandler() {
		console.log('Window resized — resizing chart...');
		chart?.resize();
	}

	onMount(() => {
		console.log('onMount called.');
		resizeObserver = new ResizeObserver(() => {
			logContainerSize('ResizeObserver callback');
			if (!chart && container.clientWidth > 0 && container.clientHeight > 0) {
				initChart();
			}
		});

		if (container) {
			console.log('Observing container...');
			resizeObserver.observe(container);
		} else {
			console.warn('Container not found on mount.');
		}
	});

	onDestroy(() => {
		console.log('Destroying chart...');
		resizeObserver?.disconnect();
		window.removeEventListener('resize', chartResizeHandler);
		chart?.dispose();
	});

	$effect(() => {
		console.log('Effect triggered: updating options...');
		if (chart && options) {
			chart.setOption(options);
		}
	});
</script>

<div bind:this={container} class="h-full min-h-screen w-full"></div>
