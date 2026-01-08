import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { TaskContextUse } from "../context/TaskContext";
import { ThemeContextUse } from "../context/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
	const { isLightMode } = ThemeContextUse();
	const [searchTerm, setSearchTerm] = useState("");
	const { searchTasks } = TaskContextUse();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		searchTasks(newSearchTerm);
	};

	const date = new Intl.DateTimeFormat("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date());

	return (
		<header className='border-0 border-gray-200 p-6 flex flex-col md:flex-row gap-3 justify-between items-center'>
			<div className='flex  items-center space-x-4'>
				<h2 className='text-md md:text-2xl font-semibold'>
					{date}
				</h2>
				{/* <div className='flex space-x-2 items-center'>
					<button
						className={`p-2 flex items-center justify-center hover:bg-gray-100  ${
							isLightMode ? "text-black" : "hover:text-black"
						} border border-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}>
						<FaArrowLeft className='w-3 h-3' />
					</button>
					<button
						className={`p-2 flex items-center justify-center hover:bg-gray-100  ${
							isLightMode ? "text-black" : "hover:text-black"
						} border border-gray-200 rounded-full cursor-pointer transition-all duration-300 ease-in-out`}>
						<FaArrowRight className='w-3 h-3' />
					</button>
				</div> */}
			</div>
			<div className='flex items-center space-x-4'>
				<div className='relative'>
					<BsSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
					<input
						type='text'
						placeholder='Search'
						value={searchTerm}
						onChange={handleSearch}
						className={`pl-10 pr-4 py-2 border border-gray-200 rounded-lg md:w-64 outline-none text-[80%] ${
							isLightMode ? "bg-white" : "bg-[#1E1E1E] text-white"
						}`}
					/>
				</div>
				<DarkModeToggle />
			</div>
		</header>
	);
};

export default Header;
