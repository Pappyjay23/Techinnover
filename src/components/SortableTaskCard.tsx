import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../context/TaskContext";
import TaskCard from "./TaskCard";

interface SortableTaskCardProps {
	task: Task;
}

const SortableTaskCard = ({ task }: SortableTaskCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<TaskCard
				task={task}
				dragHandleProps={{
					attributes,
					listeners,
				}}
			/>
		</div>
	);
};

export default SortableTaskCard;
