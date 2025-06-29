<!-- <script lang="ts">
	import { getApps, initializeApp, getApp } from 'firebase/app';
	import {
		Firestore,
		getFirestore,
		collection,
		onSnapshot,
		CollectionReference,
		doc,
		updateDoc,
		deleteDoc,
		addDoc
	} from 'firebase/firestore';
	import { app, firebaseConfig } from '$lib/firebaseConfig';
	import { browser } from '$app/environment';

	import type { Task, TaskRemoteData } from '$lib/types';

	let firebaseApp = app;
	const db: Firestore = getFirestore();

	if (browser) {
		if (getApps().length === 0) {
			firebaseApp = initializeApp(firebaseConfig);
		} else {
			getApp();
		}
	}

	const collRef: CollectionReference = collection(db, 'tasks');

	let tasks: TaskRemoteData[] = $state([]);
	let headers: String[] = ['ID', 'Label', 'Status', 'Action'];

	onSnapshot(collRef, (querySnapshot) => {
		let fbTasks: TaskRemoteData[] = [];
		querySnapshot.forEach((doc) => {
			fbTasks.push({
				id: doc.id,
				...(doc.data() as Omit<Task, 'id'>)
			});
		});
		tasks = fbTasks;
		console.log(tasks);
	});

	let taskLabel: string = $state('');
	let errorMessage: string = $state('');

	const addTask = async () => {
		const newTask: Task = {
			label: taskLabel,
			isComplete: false,
			createdAt: new Date()
		};

		const docRef = await addDoc(collection(db, 'tasks'), newTask);

		console.log('Task added successfully: ', taskLabel);
		taskLabel = '';
	};

	const completeTask = async (item: TaskRemoteData) => {
		if (!item.id) {
			throw new Error('Task ID is undefined');
		}

		const taskRef = doc(db, 'tasks', item.id);
		await updateDoc(taskRef, {
			isComplete: !item.isComplete
		});

		console.log('Task updated successfully: ', item.id);
	};

	const deleteTask = async (task: TaskRemoteData) => {
		try {
			await deleteDoc(doc(db, 'tasks', task.id));
			tasks = tasks.filter((t) => t.id !== task.id);
		} catch (error) {
			console.error('Delete failed:', error);
		}
	};
</script>

<div class="min-h-screen p-8">
	<div class="mb-8 flex items-start justify-start">
		<form onsubmit={addTask} class="flex items-center space-x-2">
			<input
				class="rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				type="text"
				placeholder="Add a new task"
				bind:value={taskLabel}
				required
			/>
			<button class="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700" type="submit">
				Add Task
			</button>
		</form>
	</div>

	{#if tasks.length > 0}
		<div class="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>ID</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Task</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Status</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each tasks as task (task.id)}
						<tr class="hover:bg-gray-50">
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500"
								>{task.id.slice(0, 8)}...</td
							>
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
								<span class:line-through={task.isComplete}>{task.label}</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap">
								{#if task.isComplete}
									<span
										class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
										>Completed</span
									>
								{:else}
									<span
										class="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800"
										>Pending</span
									>
								{/if}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap">
								<div class="flex space-x-2">
									<button
										class="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
										onclick={() => completeTask(task)}
									>
										{task.isComplete ? 'Undo' : 'Complete'}
									</button>
									<button
										class="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
										onclick={() => deleteTask(task)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
			<p class="text-gray-500">No tasks found. Add one above to get started!</p>
		</div>
	{/if}
</div>

<div class="overflow-x-auto">
	<table class="table rounded-md bg-gray-100">
		<thead>
			<tr>
				{#each headers as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each tasks as task (task.id)}
				<tr>
					<th>{task.id.slice(0, 2)}...</th>
					<td>{task.label}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div> -->
