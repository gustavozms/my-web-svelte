<script lang="ts">
	const navItems = [
		{ name: 'Profile', path: './profile' },
		{ name: 'Projects', path: './projects' }
	];
</script>

<nav class="bg-system-pink fixed top-0 left-0 z-50 w-full shadow-md">
	<div class="mx-auto flex max-w-7xl justify-center px-4 py-3">
		<div class="flex gap-8">
			{#each navItems as { name, path }}
				<a
					href={path}
					class="hover-bg-white-500 rounded-md p-2 text-lg font-semibold
					text-white hover:text-gray-800"
				>
					{name}
				</a>
			{/each}
		</div>
	</div>
</nav>
