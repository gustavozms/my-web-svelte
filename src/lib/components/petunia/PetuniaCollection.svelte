<script lang="ts">
	import PetuniaGame from './PetuniaGame.svelte';

	type Petunia = {
		name: string;
		description: string;
		unlocked: boolean;
		src: string;
	};

	const petuniaRows: Petunia[][] = [
		[
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false }
		],
		[
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ name: 'petunia', description: '', src: 'grandiflora.jpg', unlocked: false }
		]
	];

	import { onMount } from 'svelte';

	type NavigationItems = 'MENU' | 'GAME' | 'COLLECTION' | 'ABOUT' | null;

	let currentPage: NavigationItems = $state(getPage());

	onMount(() => {
		const page = getPage();

		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'MENU');
		}

		currentPage = page;
	});

	function getPage(): NavigationItems {
		if (typeof window !== 'undefined') {
			const storedPage = localStorage.getItem('petuniaPage');
			if (
				storedPage === 'MENU' ||
				storedPage === 'GAME' ||
				storedPage === 'COLLECTION' ||
				storedPage === 'ABOUT'
			) {
				return storedPage;
			}
		}
		return 'COLLECTION';
	}

	function goToGame() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'GAME');
			currentPage = getPage();
		}
	}
</script>

{#if currentPage == 'COLLECTION'}
	<div class="flex flex-col items-center justify-center gap-2 rounded-md border-2 bg-gray-100 p-8">
		{#each petuniaRows as row}
			<div class="flex justify-center gap-2">
				{#each row as petunia}
					<button onclick={goToGame}>
						<div class="avatar avatar-placeholder border-2">
							<div class="w-64 rounded">
								<!-- <img alt="petunia" src="grandiflora.jpg" /> -->
								<p class="text-6xl">?</p>
							</div>
						</div>
					</button>
				{/each}
			</div>
		{/each}
	</div>
{:else if currentPage == 'GAME'}
	<PetuniaGame />
{/if}
