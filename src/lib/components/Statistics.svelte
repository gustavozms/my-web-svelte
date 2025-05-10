<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	import Histogram from './ECharts/Histogram.svelte';
	import Boxplot from './ECharts/Boxplot.svelte';

	type Column = {
		id: string;
		name: string;
		type: 'number' | 'text' | 'category';
	};

	type DataRow = {
		id: string;
		values: Record<string, number | string>;
	};

	type Data = {
		columns: Column[];
		rows: DataRow[];
	};

	let data: Data = $state({
		columns: [{ id: 'c1', name: 'Value', type: 'number' }],
		rows: []
	});

	// For new row input
	let newRowValues: Record<string, string> = $state({});

	$effect(() => {
		data.columns.forEach((column) => {
			if (!newRowValues[column.id]) {
				newRowValues[column.id] = '';
			}
		});
	});

	// Stats
	let stats = $state(calculateStatistics());

	$effect(() => {
		stats = calculateStatistics();
	});

	function addNewRow() {
		// Validate inputs
		const hasValues = Object.values(newRowValues).some((v) => v !== '');
		if (!hasValues) return;

		// Process values based on column type
		const processedValues: Record<string, number | string> = {};
		data.columns.forEach((column) => {
			const value = newRowValues[column.id];
			if (column.type === 'number' && value) {
				processedValues[column.id] = parseFloat(value);
			} else {
				processedValues[column.id] = value;
			}
		});

		// Add the new row
		data.rows = [
			...data.rows,
			{
				id: uuidv4(),
				values: processedValues
			}
		];
	}

	function clearInputs() {
		newRowValues = Object.fromEntries(data.columns.map((column) => [column.id, '']));
	}

	function deleteRow(id: string) {
		data.rows = data.rows.filter((row) => row.id !== id);
	}

	function calculateStatistics() {
		// Get values from all rows
		const values: number[] = data.rows.map((row) => row.values['c1'] as number);

		if (values.length === 0) {
			return {
				count: 0,
				mean: 0,
				median: 0,
				amplitude: 0,
				variance: 0,
				stdDev: 0
			};
		}

		// Count
		const count = values.length;

		// Mean Average
		const sum = values.reduce((a, b) => a + b, 0);
		const mean = sum / count;

		// Weighted Average
		// const weights = new Array(values.length).fill(1);
		// const weightedSum = values.reduce((acc, val, idx) => acc + val * weights[idx], 0);
		// const weightSum = weights.reduce((a, b) => a + b, 0);
		// const weightedMean = weightSum > 0 ? weightedSum / weightSum : 0;

		// Median
		const sortedValues = [...values].sort((a, b) => a - b);
		const middle = Math.floor(sortedValues.length / 2);
		const median =
			sortedValues.length % 2 === 0
				? (sortedValues[middle - 1] + sortedValues[middle]) / 2
				: sortedValues[middle];

		// Amplitude (range)
		const min = Math.min(...values);
		const max = Math.max(...values);
		const amplitude = max - min;

		// Variance
		const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;

		// Standard Deviation
		const stdDev = Math.sqrt(variance);

		return {
			count,
			mean,
			// weightedMean,
			median,
			amplitude,
			variance,
			stdDev
		};
	}
</script>

<div class="flex h-full w-full flex-col justify-center p-4">
	<div class="max-h-1/2 overflow-auto rounded-lg shadow-lg">
		<table class=" table max-h-1/2 overflow-auto">
			<!-- Header -->
			<thead>
				<tr class="bg-base-200">
					<th class="w-16">#</th>
					{#each data.columns as column}
						<th>{column.name}</th>
					{/each}
					<th class="w-16">Actions</th>
				</tr>
			</thead>
			<tbody>
				<!-- New row input -->
				<tr class="border-base-300 bg-base-200 border-b-2">
					<th>
						<button class="btn btn-sm btn-primary" onclick={addNewRow} title="Add row" type="submit"
							>+</button
						>
					</th>
					{#each data.columns as column}
						<td>
							<input
								type={column.type === 'number' ? 'number' : 'text'}
								class="input input-md input-bordered placeholder-base-content text-base-content w-full"
								placeholder={`Enter ${column.name.toLowerCase()}`}
								bind:value={newRowValues[column.id]}
								onkeydown={(e) => {
									if (e.key === 'Enter') {
										addNewRow();
									}
								}}
							/>
						</td>
					{/each}
					<td>
						{#if Object.values(newRowValues).some((v) => v !== '')}
							<button
								class="btn btn-sm btn-outline btn-error"
								onclick={clearInputs}
								title="Clear inputs">×</button
							>
						{/if}
					</td>
				</tr>

				<!-- Data rows -->
				{#each data.rows as row, index}
					<tr class="bg-base-200">
						<th class="text-primary">{index + 1}</th>
						{#each data.columns as column}
							<td class="text-base-content">
								{row.values[column.id] ?? ''}
							</td>
						{/each}
						<td>
							<button
								class="btn btn-sm btn-outline btn-error"
								onclick={() => deleteRow(row.id)}
								title="Delete row">×</button
							>
						</td>
					</tr>
				{/each}

				<!-- Empty state -->
				{#if data.rows.length === 0}
					<tr class="bg-base-200">
						<td colspan={data.columns.length + 2} class="text-base-content py-8 text-center">
							No data.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	{#if data.rows.length > 0}
		<div class="bg-base-200 mt-8 rounded-lg p-4 shadow-md">
			<h3 class=" text-primary mb-4 text-lg">Data Statistics</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Count</div>
					<div class="stat-value text-primary">{stats.count}</div>
				</div>
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Mean</div>
					<div class="stat-value text-primary">{stats.mean.toFixed(2)}</div>
				</div>
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Median</div>
					<div class="stat-value text-primary">{stats.median.toFixed(2)}</div>
				</div>
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Amplitude</div>
					<div class="stat-value text-primary">{stats.amplitude.toFixed(2)}</div>
				</div>
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Variance</div>
					<div class="stat-value text-primary">{stats.variance.toFixed(2)}</div>
				</div>
				<div class="stat bg-base-100 rounded-md shadow">
					<div class="stat-title">Std Deviation</div>
					<div class="stat-value text-primary">{stats.stdDev.toFixed(2)}</div>
				</div>
			</div>
		</div>

		<div class="bg-base-200 mt-8 rounded-lg p-4 shadow-md">
			<h3 class="text-primary mb-4 text-lg">Data Visualization</h3>
			<Histogram data={null} />
		</div>

		<div class="bg-base-200 mt-8 rounded-lg p-4 shadow-md">
			<h3 class="text-primary mb-4 text-lg">Data Visualization</h3>
			<Boxplot data={null} />
		</div>
	{/if}
</div>
