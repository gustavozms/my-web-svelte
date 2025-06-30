<script lang="ts">
	import TheGameOfLife from './backgrounds/TheGameOfLife.svelte';
	import BriansBrain from './backgrounds/BriansBrain.svelte';

	const name: string = 'Gustavo Zahorcsak Matias Silvano';
	const subtitle: string = 'Software Developer & Bioinformatics Student';

	const randomBool: boolean = Math.random() < 0.5;
</script>

<!-- {#if randomBool} -->
<TheGameOfLife />
<!-- {:else}
	<BriansBrain />
{/if} -->

<div class="fixed inset-0 flex items-center justify-center p-4">
	<div class="border-system-pink rounded-xl border-2 bg-white p-8">
		<div class="flex flex-col items-start justify-center space-y-8">
			<h1 class="text-5xl font-bold text-gray-800">{name}</h1>
			<p class="text-2xl text-gray-600">{subtitle}</p>
		</div>
	</div>
	<!-- <a
		href={randomBool
			? 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
			: 'https://en.wikipedia.org/wiki/Brian%27s_Brain'}
		target="_blank"
		class=" text-system-pink hover:text-system-green fixed right-4 bottom-4 rounded-xl bg-white p-2 font-bold"
	>
		{randomBool ? "Conway's Game of Life" : "Brian's Brain"}
	</a> -->

	<a
		href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
		target="_blank"
		class=" text-system-pink hover:text-system-green fixed right-4 bottom-4 rounded-xl bg-white p-2 font-bold"
	>
		Conway's Game of Life
	</a>
</div>
