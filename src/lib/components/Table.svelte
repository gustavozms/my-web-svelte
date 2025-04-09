<!-- <script lang="ts">
	import type { TableData } from '$lib/types';

	const tableData: TableData = $props();
</script>

<table class="min-w-full rounded-lg border border-gray-200 bg-white shadow">
	<thead class="border-b border-gray-200 bg-gray-100">
		<tr>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Sample</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Data</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Phenotype</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Active</th>
			<th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Superuser</th>
		</tr>
	</thead>
	<tbody>
		{#each tableData.rowLabels as label}
			<tr class="border-b transition duration-250 hover:bg-gray-50">
				<td class="px-4 py-2 text-sm text-gray-700">{user.id}</td>
				<td class="px-4 py-2 text-sm text-gray-700">{user.name}</td>
				<td class="px-4 py-2 text-sm text-gray-700">{user.sample}</td>
				<td class="px-4 py-2 text-sm text-gray-700">{user.email}</td>
				<td class="px-4 py-2 text-sm text-gray-700">
					<button
						onclick={() => toggleEditUserModal(user.id)}
						class="rounded-lg bg-blue-500 px-2 py-1 text-white transition duration-250 hover:bg-blue-600"
					>
						Edit
					</button>
				</td>
				<td class="px-4 py-2 text-sm text-gray-700">
					<button
						onclick={() => goto(`/admin/phenotype/${user.id}`)}
						class="rounded-lg bg-blue-500 px-2 py-1 text-white transition duration-250 hover:bg-blue-600"
					>
						View
					</button>
				</td>

				<td class="px-4 py-2 text-sm text-gray-700">
					<span
						class="inline-block rounded-full px-2 py-1 text-xs font-semibold {user.is_active
							? 'bg-green-100 text-green-600'
							: 'bg-red-100 text-red-600'}"
					>
						{user.is_active ? 'Yes' : 'No'}
					</span>
				</td>
				<td class="px-4 py-2 text-sm text-gray-700">
					<span
						class="inline-block rounded-full px-2 py-1 text-xs font-semibold {user.is_superuser
							? 'bg-green-100 text-green-600'
							: 'bg-red-100 text-red-600'}"
					>
						{user.is_superuser ? 'Yes' : 'No'}
					</span>
				</td>
			</tr>
		{/each}
	</tbody>
</table> -->
