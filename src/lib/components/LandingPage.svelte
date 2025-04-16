<script lang="ts">
	let count: number = $state(0);

	function raiseCount() {
		count++;
		console.log(count);
	}
</script>

<div class="flex flex-col items-center justify-center space-y-32 p-4">
	<h1>
		This is a landing page prototype for <a
			target="_blank"
			href="https://gustavozms.github.io/my-cell/"
			class="text-blue-500">my game</a
		>.
	</h1>

	<button type="button" class="rounded-md bg-green-500 p-4" onclick={() => raiseCount()}
		>Google Analytics notification test
	</button>
</div>
