<script lang="ts">
	import { getApps, initializeApp, getApp } from 'firebase/app';
	import {
		Firestore,
		getFirestore,
		collection,
		onSnapshot,
		CollectionReference,
		query,
		QuerySnapshot,
		doc,
		updateDoc
	} from 'firebase/firestore';
	import { app, firebaseConfig } from '$lib/firebaseConfig';
	import { browser } from '$app/environment';

	import type { Task } from '$lib/types';
	import firebase from 'firebase/compat/app';
	import { compile } from 'svelte/compiler';

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

	let tasks: Task[] = $state([
		{ id: '1', label: 'Do something', isComplete: false, createdAt: new Date() },
		{ id: '2', label: 'Do something else', isComplete: false, createdAt: new Date() }
	]);

	const unsubscribe = onSnapshot(collRef, (querySnapshot) => {
		let fbTasks: Task[] = [];
		querySnapshot.forEach((doc) => {
			const task: Task = {
				...(doc.data() as Task)
			};
			fbTasks = [task, ...fbTasks];
		});
		tasks = fbTasks;
	});

	let taskLabel: string = $state('');
	let errorMessage: string = $state('');

	const addTask = () => {
		const task: Task = {
			id: Math.random().toString(32),
			label: taskLabel,
			isComplete: false,
			createdAt: new Date()
		};
		tasks = [...tasks, task];
		taskLabel = '';
	};

	const completeTask = async (item: Task) => {
		if (!item.id) {
			throw new Error('Task ID is undefined');
		}

		const taskRef = doc(db, 'tasks', item.id);
		await updateDoc(taskRef, {
			isComplete: !item.isComplete
		});

		console.log('Task updated successfully:', item.id);
	};

	const deleteTask = (index: number) => {
		const task = tasks[index];
		tasks = tasks.filter((item) => item != task);
	};
</script>

<div class="inset-0 flex flex-col items-center justify-center p-8">
	<form onsubmit={addTask}>
		<div class="flex items-center justify-center space-x-2">
			<input
				class="rounded-lg bg-gray-100 p-2"
				type="text"
				placeholder="Add a task"
				bind:value={taskLabel}
			/>
			<button class="bg-system-green rounded-lg border-2 p-2" type="button" onclick={addTask}
				>Add</button
			>
		</div>

		<ul>
			{#each tasks as task, index}
				<li class="p-2">
					<span class="flex items-center justify-center space-x-2">
						<p class="{task.isComplete ? 'text-system-green' : ''} rounded-lg bg-gray-100 px-4">
							{task.label}
						</p>
						<button
							class="rounded-lg bg-gray-100 px-2"
							type="button"
							onclick={() => completeTask(tasks[index])}>x</button
						>
						<button
							class="rounded-lg bg-gray-100 px-2"
							type="button"
							onclick={() => deleteTask(index)}>x</button
						>
					</span>
				</li>
			{:else}
				<p>No tasks found.</p>
			{/each}
		</ul>
	</form>
</div>
