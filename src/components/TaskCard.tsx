import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoFlagSharp } from "react-icons/io5";
import { ModalContextUse } from "../context/ModalContext";
import { Task, TaskContextUse } from "../context/TaskContext";

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { openEditModal } = ModalContextUse();
	const { deleteTask } = TaskContextUse();

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "HIGH":
				return "bg-[#EBFAE2] text-[#4F9C20]";
			case "MEDIUM":
				return "bg-[#EEF3FF] text-[#3069FE]";
			case "LOW":
				return "bg-[#FDF2F2] text-[#EC5962]";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className='bg-white rounded-lg p-4 shadow-sm cursor-pointer flex flex-col gap-4'>
			<span
				className={`text-[70%] md:text-xs px-2 py-1 rounded w-fit ${getPriorityColor(
					task.priority
				)}`}>
				{task.priority}
			</span>
			<div className='flex justify-between items-center'>
				<h4 className='text-[80%] lg:text-base font-medium'>{task.title}</h4>
				<div className='relative' ref={menuRef}>
					<button
						className='p-1 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer'
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<BsThreeDots className='w-4 h-4 text-gray-500' />
					</button>
					{isMenuOpen && (
						<div className='absolute right-[-7px] mt-2 w-24 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden'>
							<button
								className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer'
								onClick={() => {
									openEditModal(task);
									setIsMenuOpen(false);
								}}>
								Edit
							</button>
							<button
								className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer'
								onClick={() => {
									deleteTask(task.id);
									setIsMenuOpen(false);
								}}>
								Delete
							</button>
						</div>
					)}
				</div>
			</div>
			{task.image && (
				<div className='mb-3'>
					<img
						src={task.image}
						alt={task.title}
						className='w-full h-24 md:h-32 object-cover rounded'
					/>
				</div>
			)}
			{task.description && (
				<p className='text-[70%] md:text-[80%] text-gray-600 mb-3'>
					{task.description}
				</p>
			)}
			<div className='flex items-center justify-between text-sm text-gray-500'>
				<div className='flex space-x-2 items-center'>
					<IoFlagSharp className='w-4 h-4 mr-2 text-green-400' />
					<span className='text-[70%] md:text-[85%] text-[#6E7C87]'>
						{task.deadline}
					</span>
				</div>
				<span className='text-[70%] md:text-[85%] text-[#6E7C87]'>
					{task.time}
				</span>
			</div>
		</div>
	);
};

export default TaskCard;
