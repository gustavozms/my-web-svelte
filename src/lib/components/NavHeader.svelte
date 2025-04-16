<script lang="ts">
	const navItems = [
		{ name: 'Profile', path: './profile' },
		{ name: 'Projects', path: './projects' },
		{ name: 'Playground', path: './playground' },
		{ name: 'Landing Page', path: './landing_page' }
	];
</script>

<nav id="NavHeader" class="bg-system-pink fixed top-0 z-50 w-full overflow-auto">
	<div class="mx-auto flex max-w-7xl justify-center px-4 py-4">
		<div class="flex gap-8">
			{#each navItems as { name, path }}
				<a
					href={path}
					class="hover-bg-white-500 hover:text-system-green rounded-md p-2 text-lg
					font-semibold text-white"
				>
					{name}
				</a>
			{/each}
		</div>
	</div>
</nav>
