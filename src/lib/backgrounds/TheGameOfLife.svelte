<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index';

	import PlayIcon from '@lucide/svelte/icons/play';
	import PauseIcon from '@lucide/svelte/icons/pause';
	import StopIcon from '@lucide/svelte/icons/square';

	interface Props {
		backgroundMode?: boolean;
		customAspectRatio?: { x: number; y: number };
		baseGridSize?: number;
		updateInterval?: number;
		spawnInterval?: number;
		totalBirths?: number;
		totalDeaths?: number;
		avgLifespan?: number;
	}

	let {
		backgroundMode = false,
		customAspectRatio = $bindable({ x: 1, y: 1 }),
		baseGridSize = $bindable(128),
		updateInterval = $bindable(50),
		spawnInterval = $bindable(100),
		totalBirths = $bindable(0),
		totalDeaths = $bindable(0),
		avgLifespan = $bindable(0)
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let containerDiv: HTMLDivElement;
	let context: CanvasRenderingContext2D | null;
	let gridSizeX: number;
	let gridSizeY: number;
	let grid: { state: number; fadeLevel: number; lifespan: number }[][] = [];
	let isMouseDown = false;

	let currentState: 'playing' | 'paused' | 'stopped' = $state('stopped');
	let totalLifespan = 0;

	let updateIntervalId: NodeJS.Timeout | null = null;
	let spawnIntervalId: NodeJS.Timeout | null = null;

	const calculateGridSize = () => {
		if (backgroundMode) {
			const aspectRatio = window.innerWidth / window.innerHeight;
			if (aspectRatio > 1) {
				gridSizeY = baseGridSize;
				gridSizeX = Math.floor(baseGridSize * aspectRatio);
			} else {
				gridSizeX = baseGridSize;
				gridSizeY = Math.floor(baseGridSize / aspectRatio);
			}
		} else {
			gridSizeX = baseGridSize * customAspectRatio.x;
			gridSizeY = baseGridSize * customAspectRatio.y;
		}
	};

	const updateCanvasSize = () => {
		if (!canvas || !containerDiv) return;
		calculateGridSize();

		canvas.width = gridSizeX;
		canvas.height = gridSizeY;

		if (backgroundMode) {
			canvas.style.width = '100vw';
			canvas.style.height = '100vh';
		} else {
			canvas.style.width = '100%';
			canvas.style.height = '100%';
		}
	};

	const startIntervals = () => {
		if (updateIntervalId) clearInterval(updateIntervalId);
		if (spawnIntervalId) clearInterval(spawnIntervalId);
		updateIntervalId = setInterval(updateGrid, updateInterval);
		spawnIntervalId = setInterval(spawnRandomPattern, spawnInterval);
	};

	const stopIntervals = () => {
		if (updateIntervalId) clearInterval(updateIntervalId);
		if (spawnIntervalId) clearInterval(spawnIntervalId);
		updateIntervalId = null;
		spawnIntervalId = null;
	};

	$effect(() => {
		if (!canvas || currentState === 'paused') return;

		if (currentState !== 'playing') {
			updateCanvasSize();
			initializeGrid();
			drawGrid();
		}

		if (backgroundMode || currentState === 'playing') {
			startIntervals();
		}

		return () => {
			stopIntervals();
		};
	});

	const initializeGrid = () => {
		calculateGridSize();
		grid = Array.from({ length: gridSizeX }, () =>
			Array.from({ length: gridSizeY }, () => ({
				state: Math.random() > 0.5 ? 1 : 0,
				fadeLevel: 0,
				lifespan: 0
			}))
		);
	};

	const drawGrid = () => {
		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (let x = 0; x < gridSizeX; x++) {
			for (let y = 0; y < gridSizeY; y++) {
				const cell = grid[x][y];
				if (cell.state === 1) {
					context.fillStyle = '#ff0000';
					context.fillRect(x, y, 1, 1);
				} else if (cell.fadeLevel > 0) {
					context.fillStyle = `rgba(255, 0, 0, ${1 - cell.fadeLevel})`;
					context.fillRect(x, y, 1, 1);
					grid[x][y].fadeLevel = Math.min(cell.fadeLevel + 0.1, 1);
				}
			}
		}
	};

	const updateGrid = () => {
		const newGrid = grid.map((row, x) =>
			row.map((cell, y) => {
				const neighbors = countNeighbors(x, y);
				if (cell.state === 1) {
					if (neighbors < 2 || neighbors > 3) {
						// cell dies
						if (!backgroundMode) {
							totalDeaths++;
							totalLifespan += cell.lifespan;
							avgLifespan = totalDeaths > 0 ? totalLifespan / totalDeaths : 0;
						}
						return { state: 0, fadeLevel: 0.1, lifespan: 0 };
					}
					// cell survives
					return { ...cell, lifespan: cell.lifespan + updateInterval };
				}
				if (cell.state === 0 && neighbors === 3) {
					// cell is born
					if (!backgroundMode) {
						totalBirths++;
					}
					return { state: 1, fadeLevel: 0, lifespan: 0 };
				}
				return cell;
			})
		);
		grid = newGrid;
		drawGrid();
	};

	const countNeighbors = (x: number, y: number) => {
		let count = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				if (i === 0 && j === 0) continue;
				const nx = (x + i + gridSizeX) % gridSizeX;
				const ny = (y + j + gridSizeY) % gridSizeY;
				count += grid[nx][ny].state;
			}
		}
		return count;
	};

	const handleMouseDown = () => {
		isMouseDown = true;
	};

	const handleMouseUp = () => {
		isMouseDown = false;
	};

	const handleResize = () => {
		if (!canvas) return;
		updateCanvasSize();
		initializeGrid();
		drawGrid();
	};

	const spawnRandomPattern = () => {
		const patterns = [
			// Glider
			[
				[0, 0],
				[1, 0],
				[2, 0],
				[2, 1],
				[1, 2]
			],
			// Small explosion
			[
				[0, 0],
				[1, 0],
				[0, 1],
				[1, 1],
				[2, 1],
				[1, 2]
			],
			// Line
			[
				[0, 0],
				[1, 0],
				[2, 0]
			],
			// Square
			[
				[0, 0],
				[0, 1],
				[1, 0],
				[1, 1]
			]
		];
		const numPatterns = Math.floor(Math.random() * 3) + 1;

		for (let i = 0; i < numPatterns; i++) {
			const pattern = patterns[Math.floor(Math.random() * patterns.length)];
			const x = Math.floor(Math.random() * (gridSizeX - 5));
			const y = Math.floor(Math.random() * (gridSizeY - 5));

			pattern.forEach(([dx, dy]) => {
				if (x + dx < gridSizeX && y + dy < gridSizeY) {
					grid[x + dx][y + dy] = { state: 1, fadeLevel: 0, lifespan: 0 };
					if (!backgroundMode) {
						totalBirths++;
					}
				}
			});
		}
	};

	const handlePlay = () => {
		currentState = 'playing';
		startIntervals();
	};

	const handlePause = () => {
		currentState = 'paused';
		stopIntervals();
	};

	const handleStop = () => {
		currentState = 'stopped';
		stopIntervals();
		totalBirths = 0;
		totalDeaths = 0;
		totalLifespan = 0;
		avgLifespan = 0;
		initializeGrid();
		drawGrid();
	};

	onMount(() => {
		if (canvas) {
			context = canvas.getContext('2d');
			handleResize();
		}
		drawGrid();

		if (backgroundMode) {
			startIntervals();
		}

		window.addEventListener('resize', handleResize);
		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mouseup', handleMouseUp);

		return () => {
			stopIntervals();
			window.removeEventListener('resize', handleResize);
			canvas.removeEventListener('mousedown', handleMouseDown);
			canvas.removeEventListener('mouseup', handleMouseUp);
		};
	});
</script>

<div
	bind:this={containerDiv}
	class={backgroundMode ? 'fixed inset-0' : 'm-2 flex grow border-4'}
	style="aspect-ratio: {customAspectRatio.x} / {customAspectRatio.y};"
>
	{#if !backgroundMode}
		{#if currentState === 'stopped'}
			<Button
				onclick={handlePlay}
				class="absolute top-4 right-4 z-10"
				variant="default"
				size="icon"
			>
				<PlayIcon />
			</Button>
		{:else if currentState === 'paused'}
			<Button
				onclick={handlePlay}
				class="absolute top-4 right-4 z-10"
				variant="default"
				size="icon"
			>
				<PlayIcon />
			</Button>
		{:else}
			<div class="absolute top-4 right-4 z-10 flex gap-2">
				<Button onclick={handleStop} variant="destructive" size="icon">
					<StopIcon />
				</Button>
				<Button onclick={handlePause} variant="default" size="icon">
					<PauseIcon />
				</Button>
			</div>
		{/if}
	{/if}

	<canvas bind:this={canvas} class="h-full w-full" style="image-rendering: pixelated;"></canvas>
</div>
