<script lang="ts">
	import PetuniaGame from './PetuniaGame.svelte';

	import PadLockIcon from '@lucide/svelte/icons/lock-keyhole';

	import { onMount } from 'svelte';

	type Petunia = {
		index: number;
		name: string;
		description: string;
		unlocked: boolean;
		src: string;
	};

	const petuniaRows: Petunia[][] = $state([
		[
			{ index: 0, name: 'grandiflora', description: '', src: 'grandiflora.jpg', unlocked: false },
			{ index: 1, name: 'axillaris', description: '', src: 'axillaris.jpeg', unlocked: false },
			{ index: 2, name: 'atkinsiana', description: '', src: 'atkinsiana.jpeg', unlocked: false },
			{ index: 3, name: 'exserta', description: '', src: 'exserta.jpg', unlocked: false }
		],
		[
			{ index: 4, name: 'floribunda', description: '', src: 'floribunda.jpg', unlocked: false },
			{ index: 5, name: 'inflata', description: '', src: 'inflata.jpeg', unlocked: false },
			{ index: 6, name: 'integrifolia', description: '', src: 'integrifolia.jpg', unlocked: false },
			{ index: 7, name: 'milliflora', description: '', src: 'milliflora.jpeg', unlocked: false }
		]
	]);

	const unlocked = '00000000';

	type NavigationItems = 'MENU' | 'GAME' | 'COLLECTION' | 'ABOUT' | null;

	let currentPage: NavigationItems = $state(getPage());

	let selectedPetunia: Petunia = $state(petuniaRows[0][0]);

	onMount(() => {
		const page = getPage();

		if (typeof window !== 'undefined') {
			let unlockedStored: string | null;

			unlockedStored = localStorage.getItem('unlocked');

			if (!unlockedStored) {
				localStorage.setItem('unlocked', unlocked);
			}

			console.log(unlockedStored);
			console.log(petuniaRows);

			if (unlockedStored) {
				petuniaRows[0][0].unlocked = unlockedStored[0] === '1';
				petuniaRows[0][1].unlocked = unlockedStored[1] === '1';
				petuniaRows[0][2].unlocked = unlockedStored[2] === '1';
				petuniaRows[0][3].unlocked = unlockedStored[3] === '1';
				petuniaRows[1][0].unlocked = unlockedStored[4] === '1';
				petuniaRows[1][1].unlocked = unlockedStored[5] === '1';
				petuniaRows[1][2].unlocked = unlockedStored[6] === '1';
				petuniaRows[1][3].unlocked = unlockedStored[7] === '1';
			}
		}

		currentPage = page;

		checkOrientation();
		window.addEventListener('resize', checkOrientation);
		return () => window.removeEventListener('resize', checkOrientation);
	});

	let isHorizontal: boolean = $state(true);

	function checkOrientation() {
		isHorizontal = window.innerHeight < window.innerWidth;
	}

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

	function goToGame(petunia: Petunia) {
		selectedPetunia = petunia;

		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'GAME');
			currentPage = getPage();
		}
	}
</script>

{#if currentPage == 'COLLECTION'}
	<div
		class="flex {isHorizontal
			? 'flex-col'
			: ''}  items-center justify-center gap-2 rounded-md border-2 bg-indigo-400 p-8"
	>
		{#each petuniaRows as row, i}
			<div class="flex {isHorizontal ? '' : 'flex-col'} justify-center gap-2">
				{#each row as petunia, j}
					<button onclick={() => goToGame(petuniaRows[i][j])}>
						{#if petunia.unlocked}
							<div class="avatar avatar-placeholder border-2">
								<div class="{isHorizontal ? 'w-64' : 'w-32'} rounded">
									<img alt="petunia" src={petunia.src} />
								</div>
							</div>
						{:else}
							<div class="avatar avatar-placeholder border-2">
								<div class="{isHorizontal ? 'w-64' : 'w-32'} rounded">
									<PadLockIcon />
								</div>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		{/each}
	</div>
{:else if currentPage == 'GAME'}
	<PetuniaGame
		index={selectedPetunia.index}
		keyWord={selectedPetunia.name}
		src={selectedPetunia.src}
		onReturn={() => (currentPage = 'COLLECTION')}
	/>
{/if}
