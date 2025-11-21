<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as echarts from 'echarts';

	type EChartsOption = echarts.EChartsOption;

	const { option }: { option: EChartsOption } = $props();

	let chart: echarts.ECharts | null = null;
	let container: HTMLDivElement;
	let resizeObserver: ResizeObserver;

	function initChart() {
		if (container && container.clientWidth > 0 && container.clientHeight > 0) {
			chart = echarts.init(container);
			chart.setOption(option);
			window.addEventListener('resize', chartResizeHandler);
		} else {
			console.warn('Chart not initialized: container has no size.');
		}
	}

	function chartResizeHandler() {
		chart?.resize();
	}

	onMount(() => {
		resizeObserver = new ResizeObserver(() => {
			if (!chart && container.clientWidth > 0 && container.clientHeight > 0) {
				initChart();
			}
		});

		if (container) {
			resizeObserver.observe(container);
		} else {
			console.warn('Container not found on mount.');
		}
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', chartResizeHandler);
		}
		chart?.dispose();
	});

	$effect(() => {
		if (chart && option) {
			chart.setOption(option);
		}
	});
</script>

<div bind:this={container} class="flex min-h-100 min-w-100 grow"></div>
