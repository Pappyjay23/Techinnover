import { BsGear, BsInbox, BsJournalText, BsListCheck } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import LogoMobile from "../assets/logo-mobile.svg";
import Logo from "../assets/logo.svg";
import { ThemeContextUse } from "../context/ThemeContext";

const Sidebar = () => {
	const { isLightMode } = ThemeContextUse();
	const location = useLocation();

	const navLinks = [
		{ name: "Calendar", icon: IoCalendarOutline, path: "/" },
		{ name: "Inbox", icon: BsInbox, path: "/inbox" },
		{ name: "Notes", icon: BsJournalText, path: "/notes" },
		{ name: "Todo List", icon: BsListCheck, path: "/todo" },
		{ name: "Settings", icon: BsGear, path: "/settings" },
	];

	return (
		<aside
			className={`w-16 lg:w-64 h-full transition-all duration-300 border-0 z-10 ${
				isLightMode
					? "border-gray-200 bg-white"
					: "border-gray-700 bg-[#1E1E1E]"
			}`}>
			<div className='py-[40px] flex flex-col items-center lg:block'>
				{/* Logo */}
				<Link
					to='/'
					className='hidden lg:flex mb-[60px] justify-center items-center'>
					<img
						src={Logo}
						alt='Logo'
						className={`w-40 h-auto ${isLightMode ? "" : "invert"} `}
					/>
				</Link>
				<Link
					to='/'
					className={`mb-[60px] flex lg:hidden justify-center items-center border-2 border-gray-500 w-fit rounded-full ${
						isLightMode ? "" : "invert"
					} `}>
					<img src={LogoMobile} alt='Logo' className='w-10 h-auto' />
				</Link>

				{/* Navigation */}
				<nav className='space-y-6'>
					{navLinks.map((link, index) => {
						const Icon = link.icon;
						const isActive = location.pathname === link.path;

						return (
							<Link
								to={link.path}
								key={index}
								className={`flex items-center lg:space-x-5 p-5 transition-all duration-200 ease font-semibold ${
									isActive
										? isLightMode
											? "bg-[#F5F3FF] text-[#4F35F3] border-r-4 border-[#4F35F3]"
											: "bg-[#2D2D2D] text-[#A78BFA] border-r-4 border-[#A78BFA]"
										: isLightMode
										? "border-r-4 border-transparent text-[#65676D] hover:bg-gray-100"
										: "border-r-4 border-transparent text-gray-400 hover:bg-[#2D2D2D]"
								}`}>
								<Icon className='w-6 h-6' />
								<span className='uppercase hidden lg:block'>{link.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
