<script lang="ts">
	import { onMount } from 'svelte';

	import NavHeader from '$lib/components/NavHeader.svelte';

	let { children } = $props();

	let navHeaderHeight: number = $state(0);

	onMount(() => {
		const navHeader = document.getElementById('NavHeader');
		if (navHeader) {
			console.log(navHeader);
			console.log(navHeader.clientHeight.toFixed(20));

			navHeaderHeight = navHeader.clientHeight;
		}
	});
</script>

<div class="flex min-h-screen flex-col">
	<div id="NavHeader">
		<NavHeader />
	</div>
	<main class="flex-1 pt-[70px]">
		{@render children()}
	</main>
</div>
