<script lang="ts">
	import type { ProjectData } from '$lib/types';

	const projectData: ProjectData = $props();
</script>

<a
	href={projectData.link}
	target="_blank"
	class="items-centers border-system-pink flex flex-col overflow-hidden rounded-4xl border-2 bg-white md:max-w-xl md:flex-row"
>
	<img
		class="h-96 w-full object-cover md:h-auto md:w-48"
		src={projectData.icon.length > 0 ? projectData.icon : 'spider-web.svg'}
		alt="{projectData.title} image"
	/>
	<div class="flex flex-col justify-between p-4 leading-normal">
		<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-800">
			{projectData.title}
		</h1>

		<ul class="flex flex-wrap gap-2 overflow-hidden">
			{#each projectData.tools as tool}
				<li class="truncate rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800">{tool}</li>
			{/each}
		</ul>
	</div>
</a>
