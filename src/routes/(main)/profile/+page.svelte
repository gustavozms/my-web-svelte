<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { badgeVariants } from '$lib/components/ui/badge/index.js';

	import TheGameOfLife from '$lib/backgrounds/TheGameOfLife.svelte';

	const name: string = 'Gustavo Z. M. S.';
	const subtitle: string = 'Software Developer & Bioinformatics Student';
</script>

<TheGameOfLife backgroundMode />
<div class="relative flex grow items-center justify-center p-4">
	<Card.Root class="max-w-xl grow">
		<Card.Header>
			<Card.Title class="text-5xl">{name}</Card.Title>
			<Card.Description class="text-3xl">{subtitle}</Card.Description>
		</Card.Header>
	</Card.Root>
	<a
		class={badgeVariants({ variant: 'outline' })}
		style="position: fixed; bottom: 1rem; right: 1rem; "
		href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
		target="_blank"
	>
		Conway's Game of Life
	</a>
</div>
