import TaskColumn from "./TaskColumn";

const TaskBoard = () => {
	return (
		<div className='flex md:grid md:grid-cols-3 gap-4 p-6 h-full overflow-x-scroll'>
			<TaskColumn title='To do' status='TODO' />
			<TaskColumn title='In progress' status='IN_PROGRESS' />
			<TaskColumn title='Completed' status='COMPLETED' />
		</div>
	);
};

export default TaskBoard;
