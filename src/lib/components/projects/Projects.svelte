<script lang="ts">
	import Project from './Project.svelte';
	import { type ProjectData } from '$lib/types';

	const projects: ProjectData[] = [
		{
			icon: 'nulla.svg',
			title: 'Nulla',
			tools: ['Swift', 'SwiftUI', 'RealityKit', 'ARKit'],
			link: 'https://apps.apple.com/us/app/nulla-time-of-forgiveness/id6526461513'
		},
		{
			icon: 'toto.svg',
			title: 'Totó',
			tools: ['Swift', 'SwiftUI', 'CoreML'],
			link: 'https://apps.apple.com/app/tot\%C3\%B3/id6461012811?l'
		},
		{
			icon: 'cell.svg',
			title: 'WWDC - 2024',
			tools: ['Swift', 'SpriteKit', 'SwiftUI'],
			link: 'https://www.wwdcscholars.com/s/F2EDAD45-7307-4575-8BE2-85FA2AC896BD/2024'
		},
		{
			icon: 'bee.svg',
			title: 'Academy GameJam - 2024',
			tools: ['Swift', 'SpriteKit', 'SwiftUI'],
			link: 'https://github.com/msventurini/AcademyGameJam'
		},
		{
			icon: 'chaos.svg',
			title: 'Chaos',
			tools: ['Swift', 'SpriteKit', 'UIKit'],
			link: 'https://apps.apple.com/us/app/chaos/id6471442446'
		},
		{
			icon: '',
			title: 'Task List',
			tools: ['SvelteKit', 'TypeScript'],
			link: './task_list'
		},
		{
			icon: '',
			title: 'My Cell',
			tools: ['Unity', 'C#'],
			link: 'https://gustavozms.github.io/my-cell/'
		},
		{
			icon: '',
			title: 'Stats Calculator',
			tools: ['Typescript', 'Svelte', 'ECharts'],
			link: './statistics'
		}
	];
</script>

<div class=" grid grid-cols-1 justify-center gap-4 p-8 sm:grid-cols-2 lg:grid-cols-3">
	{#each projects as project}
		<Project {...project} />
	{/each}
</div>
