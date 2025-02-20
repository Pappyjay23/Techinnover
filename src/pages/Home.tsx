import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";

const Home = () => {
	return (
		<main className='flex-1 overflow-hidden flex flex-col'>
			<Header />
			<div className='flex-1 overflow-hidden'>
				<TaskBoard />
			</div>
		</main>
	);
};

export default Home;
