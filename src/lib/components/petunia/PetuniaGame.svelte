<script lang="ts">
	import XIcon from '@lucide/svelte/icons/x';

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	const keyboardRows = [
		['A', 'B', 'C', 'D', 'E', 'F', 'G'],
		['H', 'I', 'J', 'K', 'L', 'M', 'N'],
		['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
		['V', 'W', 'X', 'Y', 'Z']
	];

	const props: { index: number; keyWord: string; src: string; onReturn: () => void } = $props();
	const keyWordID = $derived(
		Array.from(new Set(props.keyWord.toUpperCase().replaceAll(' ', '').split('').sort())).join('')
	);

	const hasWon = $derived(
		Array.from(keyWordID).every((letter) => guessedLettersID.includes(letter))
	);

	let selectedLetter: string = $state('');
	let guessedLetters: string = $state('');
	const guessedLettersID = $derived(Array.from(new Set(guessedLetters.split('').sort())).join(''));

	function handleSubmit() {
		if (!selectedLetter) return;

		guessedLetters += selectedLetter;
		selectedLetter = '';

		if (hasWon) {
			if (typeof window !== 'undefined') {
				let unlocked: string | null;

				unlocked = localStorage.getItem('unlocked');

				if (unlocked) {
					unlocked = unlocked.substring(0, props.index) + '1' + unlocked.substring(props.index + 1);
					localStorage.setItem('unlocked', unlocked);
				}
			}

			setTimeout(goToCollection, 1000);
			setTimeout(props.onReturn, 2000);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		const key = event.key.toUpperCase();

		if (event.key === 'Backspace') {
			selectedLetter = '';
			return;
		}

		if (event.key === 'Enter') {
			handleSubmit();
			return;
		}

		if (alphabet.includes(key) && !guessedLetters.includes(key)) {
			selectedLetter = key;
		}
	}

	function goToCollection() {
		if (typeof window !== 'undefined') {
			localStorage.setItem('petuniaPage', 'COLLECTION');
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="flex flex-col items-center justify-center gap-2 rounded-md border-2 bg-gray-100 p-8">
	<div class="avatar">
		<div class="w-64 rounded">
			<img alt="petunia" src={props.src} />
		</div>
	</div>

	<div class="my-2 flex gap-2">
		{#each props.keyWord.toUpperCase().split('') as letter}
			{#if hasWon}
				<h1 class="text-2xl text-green-500 italic">{letter}</h1>
			{:else if guessedLettersID.includes(letter.toUpperCase())}
				<h1 class="text-2xl">{letter}</h1>
			{:else if letter == ' '}
				<h1 class="text-2xl">{' '}</h1>
			{:else}
				<h1 class="text-2xl">{'_'}</h1>
			{/if}
		{/each}
	</div>

	<h1 class="border-primary h-10 w-10 content-center rounded-md border-2 text-center select-none">
		{selectedLetter}
	</h1>

	<div class="mb-4 flex flex-col gap-2">
		{#each keyboardRows as row}
			<div class="flex justify-center gap-2">
				{#each row as letter}
					{#if guessedLetters.includes(letter)}
						<h1
							class="border-primary h-10 w-10 content-center rounded-md border-2 text-center select-none {keyWordID.includes(
								letter
							)
								? 'bg-green-200'
								: 'bg-red-200'}"
						>
							{letter}
						</h1>
					{:else}
						<button
							class="btn btn-primary h-10 w-10"
							onclick={() => (selectedLetter = letter)}
							class:btn-active={selectedLetter === letter}
						>
							{letter}
						</button>
					{/if}
				{/each}
			</div>
		{/each}
	</div>

	<div class="flex gap-2">
		<button
			class="btn btn-primary btn-outline btn-circle"
			disabled={!selectedLetter}
			onclick={() => (selectedLetter = '')}><XIcon /></button
		>
		<button class="btn btn-primary" disabled={!selectedLetter} onclick={handleSubmit}
			>Confirmar</button
		>
	</div>
</div>
