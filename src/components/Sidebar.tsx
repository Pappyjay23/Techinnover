import { BsGear, BsInbox, BsJournalText, BsListCheck } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import LogoMobile from "../assets/logo-mobile.svg";

const Sidebar = () => {
	const navLinks = [
		{
			name: "Calendar",
			icon: IoCalendarOutline,
			path: "/",
		},
		{
			name: "Inbox",
			icon: BsInbox,
			path: "/inbox",
		},
		{
			name: "Notes",
			icon: BsJournalText,
			path: "/notes",
		},
		{
			name: "Todo List",
			icon: BsListCheck,
			path: "/todo",
		},
		{
			name: "Settings",
			icon: BsGear,
			path: "/settings",
		},
	];

	const location = useLocation();

	return (
		<aside className='w-16 lg:w-64 border-0 border-gray-200 h-full'>
			<div className='py-[40px]'>
				<Link
					to='/'
					className='hidden lg:flex text-2xl font-bold mb-[60px] justify-center items-center'>
					<img src={Logo} alt='Logo' className='w-40 h-auto' />
				</Link>
				<Link
					to='/'
					className='text-2xl font-bold mb-[60px] flex lg:hidden justify-center items-center'>
					<img src={LogoMobile} alt='Logo' className='w-10 h-auto' />
				</Link>
				<nav className='space-y-6'>
					{navLinks.map((link, index) => {
						const Icon = link.icon;
						const isActive = location.pathname === link.path;
						return (
							<Link
								to={link.path}
								key={index}
								className={`flex items-center lg:space-x-5 ${
									isActive
										? "bg-[#F5F3FF] text-[#4F35F3] border-r-4 border-[#4F35F3]"
										: "border-r-4 border-transparent text-[#65676D]"
								} p-5 transition-all duration-200 ease`}>
								<Icon className='w-6 h-6' />
								<span className='uppercase font-medium hidden lg:block'>{link.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
