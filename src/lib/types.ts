type ProjectData = {
	icon: string;
	title: string;
	tools: string[];
	link: string;
};

type Task = {
	id: string;
	label: string;
	isComplete: boolean;
	createdAt: Date;
};

export type { ProjectData, Task };
