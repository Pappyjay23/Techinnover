import { BsSearch } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Header = () => {
	return (
		<header className='border-0 border-gray-200 p-6 flex justify-between items-center'>
			<div className='flex items-center space-x-4'>
				<h2 className='text-2xl font-semibold'>2 August 2023</h2>
				<div className='flex space-x-2 items-center'>
					<button className='p-2 flex items-center justify-center hover:bg-gray-100 border border-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out'>
						<FaArrowLeft className='w-3 h-3' />
					</button>
					<button className='p-2 flex items-center justify-center hover:bg-gray-100 border border-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out'>
						<FaArrowRight className='w-3 h-3' />
					</button>
				</div>
			</div>
			<div className='relative'>
				<BsSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
				<input
					type='text'
					placeholder='Search'
					className='pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 outline-none text-[80%]'
				/>
			</div>
		</header>
	);
};

export default Header;
