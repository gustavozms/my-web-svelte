<script lang="ts">
	import PetuniaCollection from './PetuniaCollection.svelte';
	import PetuniaAbout from './PetuniaAbout.svelte';

	import HomeIcon from '@lucide/svelte/icons/house';

	import { onMount } from 'svelte';
	import PetuniaCredits from './PetuniaCredits.svelte';

	type NavigationItems = 'MENU' | 'GAME' | 'COLLECTION' | 'ABOUT' | 'CREDITS' | null;

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
				storedPage === 'ABOUT' ||
				storedPage === 'CREDITS'
			) {
				return storedPage;
			}
		}
		return 'MENU';
	}

	function goToMenu() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'MENU');
			currentPage = getPage();
		}
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
	function goToCredits() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'CREDITS');
			currentPage = getPage();
		}
	}
</script>

<div
	class="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-violet-600 to-indigo-600"
>
	{#if currentPage == 'MENU'}
		<img class="h-full w-full object-none" src="petunia_background.png" alt="background" />
		<div class="absolute inset-0 z-10 m-8 flex flex-col gap-2 rounded-md">
			<img class="max-w-lg" src="petunia_logo.png" alt="" />
			<button class="btn btn-xl btn-outline ml-24 w-64 text-white" onclick={goToCollection}>
				Petunias</button
			>
			<button class="btn btn-xl btn-outline ml-24 w-64 text-white" onclick={goToAbout}>
				Tutorial</button
			>
			<button class="btn btn-xl btn-outline ml-24 w-64 text-white" onclick={goToCredits}>
				Créditos</button
			>
		</div>
	{:else if currentPage == 'COLLECTION'}
		<button class="btn btn-outline fixed top-4 left-4 text-white" onclick={goToMenu}
			><HomeIcon /></button
		>
		<PetuniaCollection />
	{:else if currentPage == 'ABOUT'}
		<button class="btn btn-outline fixed top-4 left-4 text-white" onclick={goToMenu}
			><HomeIcon /></button
		>
		<PetuniaAbout />
	{:else if currentPage == 'CREDITS'}
		<button class="btn btn-outline fixed top-4 left-4 text-white" onclick={goToMenu}
			><HomeIcon /></button
		>
		<PetuniaCredits />
	{/if}
</div>
