<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import { mode, toggleMode } from 'mode-watcher';
	import { resolve } from '$app/paths';

	import UserIcon from '@lucide/svelte/icons/circle-user';
	import GolIcon from '@lucide/svelte/icons/chart-area';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';

	const items = [
		{
			title: 'Profile',
			url: resolve('/(main)/profile'),
			icon: UserIcon
		},
		{
			title: 'GoL',
			url: resolve('/(main)/gol'),
			icon: GolIcon
		}
	];
</script>

<Sidebar.Root variant="floating" collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.MenuButton onclick={toggleMode} variant="default" class="flex w-full gap-2">
			{#if mode.current === 'dark'}
				<SunIcon />
			{:else}
				<MoonIcon />
			{/if}
			<span>Toggle Theme</span>
		</Sidebar.MenuButton>
	</Sidebar.Footer>
</Sidebar.Root>
<Sidebar.Trigger class="inherit top-2 right-2 z-50" />
