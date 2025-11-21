<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index';

	import AppSidebar from '$lib/AppSidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="flex grow">
		{@render children?.()}
	</main>
</Sidebar.Provider>

<!-- <style>
	.container {
		position:;
	}
</style> -->
