type ProjectData = {
	icon: string;
	title: string;
	tools: string[];
	link: string;
	targetBlank?: boolean;
};

type TableData = {
	rowLabels: string[];
	colLabels: string[];
};

type Task = {
	id?: string;
	label: string;
	isComplete: boolean;
	createdAt: Date;
};

type TaskRemoteData = Task & { id: string };

export type { ProjectData, TableData, Task, TaskRemoteData };
