<script lang="ts">
	import NavHeader from '$lib/components/NavHeader.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<NavHeader />
	<main class="flex-1 pt-[60px]">
		{@render children()}
	</main>
</div>
