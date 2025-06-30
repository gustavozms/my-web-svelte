<script lang="ts">
	import PetuniaCollection from './PetuniaCollection.svelte';
	import PetuniaAbout from './PetuniaAbout.svelte';

	import HomeIcon from '@lucide/svelte/icons/house';
	import BackIcon from '@lucide/svelte/icons/arrow-big-left';

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
		return 'MENU';
	}

	function goToCollection() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'COLLECTION');
			currentPage = getPage();
		}
	}
	function goToAbout() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'ABOUT');
			currentPage = getPage();
		}
	}
</script>

<div class="fixed inset-0 flex flex-col items-center justify-center bg-indigo-400">
	{#if currentPage == 'MENU'}
		<div class="m-8 flex flex-col gap-2 rounded-md border-2 bg-gray-100 p-2">
			<h1 class="text-bold my-2 text-6xl">Menu</h1>
			<div class="avatar">
				<div class="w-64 rounded">
					<img alt="petunia" src="grandiflora.jpg" />
				</div>
			</div>
			<button class="btn btn-primary" onclick={goToCollection}> Collection</button>
			<button class="btn btn-primary" onclick={goToAbout}> About</button>
		</div>
	{:else if currentPage == 'COLLECTION'}
		<PetuniaCollection />
	{:else if currentPage == 'ABOUT'}
		<PetuniaAbout />
	{/if}
</div>
