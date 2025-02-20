import { IoCheckmarkDoneSharp } from "react-icons/io5";

const TodoList = () => {
	return (
		<main className='flex-1 p-2 overflow-hidden flex items-center justify-center bg-[#F5F3FF] md:bg-gray-50'>
			<div className='flex flex-col items-center justify-center w-fit md:bg-[#F5F3FF] rounded-lg p-4 md:p-10'>
				<IoCheckmarkDoneSharp className='text-[#4F35F3] text-4xl lg:text-5xl mb-4' />
				<h1 className='text-3xl font-bold text-black mb-2'>To-Do List</h1>
				<p className='text-lg md:text-xl text-gray-700 mb-8 text-center'>
					Manage your tasks efficiently.
				</p>
				<div className='bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md w-full'>
					<p className='text-black text-center'>
						A powerful to-do list feature is on the way! Keep track of your
						daily activities and stay organized.
					</p>
					<div className='mt-6 bg-gray-300 h-2 rounded-full overflow-hidden'>
						<div className='bg-[#4F35F3] h-full w-2/3 rounded-full'></div>
					</div>
					<p className='text-gray-400 text-sm text-center mt-2'>
						Feature completion: 66%
					</p>
				</div>
			</div>
		</main>
	);
};

export default TodoList;
