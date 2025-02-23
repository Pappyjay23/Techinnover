import React from "react";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoFlagSharp } from "react-icons/io5";
import { ModalContextUse } from "../context/ModalContext";
import { Task } from "../context/TaskContext";
import { ThemeContextUse } from "../context/ThemeContext";

interface TaskCardProps {
	task: Task;
	dragHandleProps?: {
		attributes: DraggableAttributes;
		listeners: SyntheticListenerMap | undefined;
	};
}

const TaskCard = ({ task, dragHandleProps }: TaskCardProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { openEditModal, openDeleteModal } = ModalContextUse();

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

	const handleMenuClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	const handleMenuItemClick = (e: React.MouseEvent, action: () => void) => {
		e.stopPropagation();
		action();
		setIsMenuOpen(false);
	};
	const { isLightMode } = ThemeContextUse();

	return (
		<div
			className={`${
				isLightMode ? "bg-white" : " bg-[#202020]"
			} rounded-lg p-4 shadow-sm flex flex-col gap-4 relative cursor-move`}
			{...dragHandleProps?.attributes}
			{...dragHandleProps?.listeners}>
			<span
				className={`text-[70%] md:text-xs px-2 py-1 rounded w-fit ${getPriorityColor(
					task.priority
				)}`}>
				{task.priority}
			</span>
			<div className='flex justify-between items-center'>
				<h4
					className={`text-[80%] lg:text-base font-medium  ${
						isLightMode ? "text-black" : " text-white"
					} `}>
					{task.title}
				</h4>
				<div
					className='relative z-10'
					ref={menuRef}
					onPointerDown={(e) => e.stopPropagation()}>
					<button
						className='p-1 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer'
						onClick={handleMenuClick}>
						<BsThreeDots className='w-4 h-4 text-gray-500' />
					</button>
					{isMenuOpen && (
						<div className='absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden'>
							<button
								className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-black cursor-pointer'
								onClick={(e) =>
									handleMenuItemClick(e, () => openEditModal(task))
								}>
								Edit
							</button>
							<button
								className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 cursor-pointer'
								onClick={(e) =>
									handleMenuItemClick(e, () => openDeleteModal(task))
								}>
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
				<p
					className={`text-[70%] md:text-[80%]  ${
						isLightMode ? "text-gray-600" : " text-white"
					} mb-3`}>
					{task.description}
				</p>
			)}
			<div className='flex items-center justify-between text-sm text-gray-500'>
				<div className='flex space-x-2 items-center'>
					<IoFlagSharp
						className={`w-4 h-4 mr-2 ${
							task.status === "COMPLETED" ? "text-green-400" : "text-gray-400"
						}`}
					/>
					<span
						className={`text-[70%] md:text-[85%] ${
							isLightMode ? "text-[#6E7C87]" : " text-white"
						}`}>
						{task.deadline}
					</span>
				</div>
				<span
					className={`text-[70%] md:text-[85%] lowercase ${
						isLightMode ? "text-[#6E7C87]" : " text-white"
					}`}>
					{task.time}
				</span>
			</div>
		</div>
	);
};

export default TaskCard;
