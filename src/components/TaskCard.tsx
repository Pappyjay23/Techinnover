import { BsThreeDots } from "react-icons/bs";
import { IoFlagSharp } from "react-icons/io5";

interface Task {
	id: number;
	title: string;
	priority: string;
	description?: string;
	image?: string;
	date: string;
	time: string;
}

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
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
				<button className='p-1 hover:bg-gray-100 border border-gray-200 rounded-lg cursor-pointer'>
					<BsThreeDots className='w-4 h-4 text-gray-500' />
				</button>
			</div>
			{task.image && (
				<div className='mb-3'>
					<img
						src={task.image || "/placeholder.svg"}
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
				<div className="flex space-x-2 items-center">
					<IoFlagSharp className='w-4 h-4 mr-2 text-green-400' />
					<span className="text-[70%] md:text-[85%] text-[#6E7C87]">{task.date}</span>
				</div>
				<span className="text-[70%] md:text-[85%] text-[#6E7C87]">{task.time}</span>
			</div>
		</div>
	);
};

export default TaskCard;
