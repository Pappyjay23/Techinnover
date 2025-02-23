import { IoMailSharp } from "react-icons/io5";
import { ThemeContextUse } from "../context/ThemeContext";

const Inbox = () => {
	const { isLightMode } = ThemeContextUse();

	return (
		<main
			className={`flex-1 p-2 overflow-hidden flex items-center justify-center transition-all duration-300 ${
				isLightMode ? "bg-[#F5F3FF] md:bg-gray-50" : "bg-[#1E1E1E]"
			}`}>
			<div
				className={`flex flex-col items-center justify-center w-fit rounded-lg p-4 md:p-10 transition-all duration-300 ${
					isLightMode ? "md:bg-[#F5F3FF]" : "md:bg-[#2D2D2D]"
				}`}>
				<IoMailSharp
					className={`text-4xl lg:text-5xl mb-4 ${
						isLightMode ? "text-[#4F35F3]" : "text-[#A78BFA]"
					}`}
				/>
				<h1
					className={`text-3xl font-bold mb-2 ${
						isLightMode ? "text-black" : "text-white"
					}`}>
					Inbox
				</h1>
				<p
					className={`text-lg md:text-xl text-center mb-8 ${
						isLightMode ? "text-gray-700" : "text-gray-300"
					}`}>
					Stay connected with your messages.
				</p>
				<div
					className={`p-4 md:p-8 rounded-lg shadow-lg max-w-md w-full transition-all duration-300 ${
						isLightMode ? "bg-white" : "bg-[#3A3B3C]"
					}`}>
					<p
						className={`text-center ${
							isLightMode ? "text-black" : "text-gray-200"
						}`}>
						The inbox feature is coming soon! You'll be able to send and receive
						messages easily.
					</p>
					<div
						className={`mt-6 h-2 rounded-full overflow-hidden ${
							isLightMode ? "bg-gray-300" : "bg-gray-600"
						}`}>
						<div
							className={`h-full w-1/4 rounded-full ${
								isLightMode ? "bg-[#4F35F3]" : "bg-[#A78BFA]"
							}`}></div>
					</div>
					<p
						className={`text-sm text-center mt-2 ${
							isLightMode ? "text-gray-400" : "text-gray-500"
						}`}>
						Feature completion: 25%
					</p>
				</div>
			</div>
		</main>
	);
};

export default Inbox;
