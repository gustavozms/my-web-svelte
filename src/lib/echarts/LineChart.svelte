<script lang="ts">
	import ECharts from './ECharts.svelte';
	import type { EChartsOption } from 'echarts';

	const { data }: { data: number[] } = $props();

	const option = $derived<EChartsOption>({
		xAxis: {
			type: 'category',
			name: 'Time',
			nameLocation: 'middle',
			nameGap: 30,
			data: Array.from({ length: data.length }, (_, i) => i.toString()),
			boundaryGap: false
		},
		yAxis: {
			type: 'value',
			name: 'Average Lifespan',
			nameLocation: 'middle',
			nameGap: 50,
			axisLabel: {
				formatter: '{value} ms'
			}
		},
		series: [
			{
				data: data,
				type: 'line',
				smooth: true
			}
		]
	});
</script>

<ECharts {option} />
