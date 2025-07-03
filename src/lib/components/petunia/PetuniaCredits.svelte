<script lang="ts">
	import { onMount } from 'svelte';

	let isHorizontal: boolean = $state(true);

	onMount(() => {
		checkOrientation();
		window.addEventListener('resize', checkOrientation);
		return () => window.removeEventListener('resize', checkOrientation);
	});

	function checkOrientation() {
		isHorizontal = window.innerHeight < window.innerWidth;
	}
</script>

<div
	class="inset-0 flex h-full w-full grow flex-col items-center justify-center overflow-auto bg-gradient-to-r from-violet-600 to-indigo-600"
>
	<div
		class="{isHorizontal
			? 'mx-64'
			: 'mx-16'} my-16 flex flex-col items-center justify-center gap-8 p-2"
	>
		<h1 class=" text-5xl font-bold text-white">
			Desenvolvido pelos estudantes de Biotecnologia da UFRGS:
		</h1>
		<p class=" text-2xl text-white italic">
			Graciela Luana Ruidiaz Correa <br /> Gustavo Zahorcsak Matias Silvano <br /> Laura da Costa
			Devincenzi <br /> Yasmin Chaves Scimczak Medeiros
		</p>
	</div>
</div>
