import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export interface Task {
	id: string;
	title: string;
	description: string;
	priority: string;
	image?: string;
	deadline: string;
	time: string;
	status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

interface TaskContextType {
	tasks: Task[];
	filteredTasks: Task[];
	addTask: (task: Omit<Task, "id">) => void;
	updateTask: (task: Task) => void;
	deleteTask: (id: string) => void;
	moveTask: (id: string, newStatus: Task["status"]) => void;
	reorderTasks: (task: Task[]) => void;
	searchTasks: (searchTerm: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultTasks: Task[] = [
	{
		id: "1",
		title: "Publish my first book",
		description:
			"Write a blog post outlining the top 10 productivity tips for busy professionals. The post should be engaging, informative, and include actionable advice. Target word count: 1,200 words.",
		priority: "HIGH",
		image:
			"https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "TODO",
	},
	{
		id: "2",
		title: "Home Renovation",
		description:
			"Plan and execute a home renovation project focusing on the kitchen and living room.",
		priority: "MEDIUM",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "TODO",
	},
	{
		id: "3",
		title: "Organize a charity event",
		description:
			"Plan and coordinate a local charity event to raise funds for the community center.",
		priority: "HIGH",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "TODO",
	},
	{
		id: "4",
		title: "Watch a Frontend Tutorial",
		description:
			"Complete an online course on advanced React patterns and hooks.",
		priority: "LOW",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "IN_PROGRESS",
	},
	{
		id: "5",
		title: "Prep my week meal",
		description:
			"Plan and prepare meals for the upcoming week to save time and eat healthier.",
		priority: "MEDIUM",
		image:
			"https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "IN_PROGRESS",
	},
	{
		id: "6",
		title: "Read a book",
		description:
			"Finish reading 'The Pragmatic Programmer' and take notes on key concepts.",
		priority: "MEDIUM",
		image:
			"https://plus.unsplash.com/premium_photo-1684331678124-ff62c82cef7a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "COMPLETED",
	},
	{
		id: "7",
		title: "Improve cards readability",
		description:
			"As a team license owner, I want to use multiplied limits to enhance card readability in our project management tool.",
		priority: "LOW",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "COMPLETED",
	},
	{
		id: "8",
		title: "Attend Standup and give updates",
		description:
			"Participate in the daily standup meeting and provide updates on current tasks and any blockers.",
		priority: "HIGH",
		deadline: "Aug 26, 2024",
		time: "2:00PM",
		status: "COMPLETED",
	},
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		const storedTasks = localStorage.getItem("tasks");
		return storedTasks ? JSON.parse(storedTasks) : defaultTasks;
	});

	const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
		setFilteredTasks(tasks);
	}, [tasks]);

	const addTask = (task: Omit<Task, "id">) => {
		const newTask = { ...task, id: Date.now().toString() };
		setTasks([...tasks, newTask]);
		toast.success("Task added successfully!");
	};

	const updateTask = (updatedTask: Task) => {
		setTasks(
			tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
		toast.success("Task updated successfully!");
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
		toast.success("Task deleted successfully!");
	};

	const moveTask = (id: string, newStatus: Task["status"]) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, status: newStatus } : task
			)
		);
		// toast.info("Task moved successfully!")
	};

	const searchTasks = (searchTerm: string) => {
		if (!searchTerm.trim()) {
			setFilteredTasks(tasks);
			return;
		}

		const filtered = tasks.filter(
			(task) =>
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.description.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredTasks(filtered);
	};

	const reorderTasks = (newTasks: Task[]) => {
		setTasks(newTasks);
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				filteredTasks,
				addTask,
				updateTask,
				deleteTask,
				moveTask,
				reorderTasks,
				searchTasks,
			}}>
			{children}
		</TaskContext.Provider>
	);
};

export const TaskContextUse = () => {
	const context = useContext(TaskContext);
	if (context === undefined) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
};
