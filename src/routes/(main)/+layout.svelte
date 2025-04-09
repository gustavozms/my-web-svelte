<script lang="ts">
	import { onMount } from 'svelte';

	import NavHeader from '$lib/components/NavHeader.svelte';

	let { children } = $props();

	let navHeaderHeight: number = $state(0);

	onMount(() => {
		const navHeader = document.getElementById('NavHeader');
		if (navHeader) {
			console.log(navHeader);
			console.log('offSetH: ', navHeader.offsetHeight);

			navHeaderHeight = navHeader.offsetHeight;

			console.log(navHeaderHeight);
		}
	});
</script>

<div class="flex flex-col">
	<NavHeader />

	<main class="flex-1 pt-[70px]">
		{@render children()}
	</main>
</div>
