<script lang="ts">
	import { Slider } from '$lib/components/ui/slider/index.js';
	import { Label } from '$lib/components/ui/label/index';
	import TheGameOfLife from '$lib/backgrounds/TheGameOfLife.svelte';
	import LineChart from '$lib/echarts/LineChart.svelte';

	const customAspectRatio = { x: 1, y: 1 };
	let baseGridSize = $state(128);
	let updateInterval = $state(50);
	let spawnInterval = $state(50);
	let totalBirths = $state(0);
	let totalDeaths = $state(0);
	let avgLifespan = $state(0);
	let lifespanHistory = $state<number[]>([]);

	$effect(() => {
		if (avgLifespan > 0) {
			lifespanHistory = [...lifespanHistory, avgLifespan];
		}
	});
</script>

<div class="m-8 flex grow flex-col items-center justify-center gap-8 p-8">
	<TheGameOfLife
		bind:baseGridSize
		{customAspectRatio}
		bind:updateInterval
		bind:spawnInterval
		bind:totalBirths
		bind:totalDeaths
		bind:avgLifespan
	/>

	<p>Total Births: {totalBirths}</p>
	<p>Total Deaths: {totalDeaths}</p>
	<p>Average Lifespan: {avgLifespan}ms</p>

	<Label for=""
		>Grid Size: x: {baseGridSize * customAspectRatio.x} y: {baseGridSize *
			customAspectRatio.y}</Label
	>
	<Slider class="max-w-lg" type="single" bind:value={baseGridSize} min={4} max={256} step={1} />
	<Label for="">Update Interval: {updateInterval}ms</Label>
	<Slider
		class="max-w-lg"
		type="single"
		bind:value={updateInterval}
		min={10}
		max={1000}
		step={10}
	/>
	<Label for="">Spawn Interval: {spawnInterval}ms</Label>
	<Slider class="max-w-lg" type="single" bind:value={spawnInterval} min={10} max={100} step={10} />
	<LineChart data={lifespanHistory} />
</div>
