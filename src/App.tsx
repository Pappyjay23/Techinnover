import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Notes from "./pages/Notes";
import TodoList from "./pages/TodoList";

function App() {
	return (
		<Router>
			<div className='flex h-screen bg-white'>
				<Sidebar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/inbox' element={<Inbox />} />
					<Route path='/notes' element={<Notes />} />
					<Route path='/todo' element={<TodoList />} />
					<Route path='/settings' element={<Settings />} />
				</Routes>
				
			</div>
		</Router>
	);
}

export default App;
