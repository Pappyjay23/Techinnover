import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContextUse } from "../context/ThemeContext";

const DarkModeToggle = () => {
	const { isLightMode, toggleTheme } = ThemeContextUse();

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-full ${
				isLightMode
					? "bg-gray-200 text-gray-800 hover:bg-gray-300"
					: "bg-gray-700 text-gray-200 hover:bg-gray-600"
			} transition-colors duration-500 ease-in-out cursor-pointer`}
			aria-label='Toggle dark mode'>
			{isLightMode ? (
                <MdDarkMode className='h-5 w-5' />
            ) : (
				<MdLightMode className='h-5 w-5' />
			)}
		</button>
	);
};

export default DarkModeToggle;
