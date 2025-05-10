<script lang="ts">
	import ECharts from './ECharts.svelte';
	import type { EChartsOption } from 'echarts';

	const { data }: { data: Record<string, number>[] | null } = $props();

	const options: EChartsOption = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar'
			}
		]
	};
</script>

<div class="h-full w-full">
	<ECharts {options} />
</div>
