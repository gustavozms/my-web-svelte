<script lang="ts">
	import { onMount } from 'svelte';

	import NavHeader from '$lib/components/NavHeader.svelte';

	let { children } = $props();
	let navHeaderHeight: number = $state(0);

	onMount(() => {
		const head = document.querySelector('NavHeader');
		if (head) {
			console.log(head);
			console.log(head.clientHeight.toFixed(20));
			navHeaderHeight = head.clientHeight;
		}
	});
</script>

<div class="flex min-h-screen flex-col">
	<div class="NavHeader">
		<NavHeader />
	</div>
	<main class="flex-1 pt-[70px]">
		{@render children()}
	</main>
</div>
