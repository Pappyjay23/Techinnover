import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BsPlus } from "react-icons/bs";
import SortableTaskCard from "./SortableTaskCard";
import { TaskContextUse, type Task } from "../context/TaskContext";
import { ModalContextUse } from "../context/ModalContext";

interface TaskColumnProps {
	title: string;
	status: Task["status"];
}

const TaskColumn = ({ title, status }: TaskColumnProps) => {
	const { tasks } = TaskContextUse();
	const { openAddModal } = ModalContextUse();
	const { setNodeRef } = useDroppable({ id: `column-${status}` });

	const columnTasks = tasks.filter((task) => task.status === status);

	return (
		<div className='bg-[#F5F7F9] shadow-sm rounded-lg p-4 flex flex-col overflow-hidden h-fit max-h-full min-w-full'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center space-x-2'>
					<h3 className='font-medium text-[#6F6F6F]'>{title}</h3>
					<span className='bg-[#DDDDDD] text-[#6F6F6F] px-2 py-0.5 rounded-[4px] text-sm'>
						{columnTasks.length}
					</span>
				</div>
				<button
					onClick={() => openAddModal(status)}
					className='p-1 hover:bg-gray-200 rounded cursor-pointer transition-all duration-200 ease'>
					<BsPlus className='w-6 h-6 text-[#6F6F6F]' />
				</button>
			</div>
			<div
				ref={setNodeRef}
				className='space-y-4 flex-1 py-4 overflow-y-auto min-h-[100px]'>
				<SortableContext
					items={columnTasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}>
					{columnTasks.map((task) => (
						<SortableTaskCard key={task.id} task={task} />
					))}
				</SortableContext>
			</div>
		</div>
	);
};

export default TaskColumn;
