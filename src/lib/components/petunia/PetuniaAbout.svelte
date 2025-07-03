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
		<h1 class=" text-6xl font-bold text-white">Como Funciona?</h1>
		<p class="text-2xl text-white">
			O jogo da forca utiliza de informações taxonômicas de diferentes petúnias. Conforme a fase
			passa, uma petúnia acertada é desbloqueada com sua respectiva imagem. Caso entre as tentativas
			haja uma letra errada, o jogador perde um dos chutes.
		</p>
		<h1 class="text-6xl font-bold text-white">Taxonomia:</h1>
		<p class="text-2xl text-white">
			A taxonomia é responsável por descrever, identificar e nomear os seres vivos segundo os
			critérios estabelecidos, como, por exemplo, aspectos morfológicos, genéticos, fisiológicos e
			reprodutivos.
		</p>
	</div>
</div>
