import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import TaskForm from "./components/TaskForm";
import { ModalContextUse, ModalProvider } from "./context/ModalContext";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import TodoList from "./pages/TodoList";

function AppContent() {
	const {
		isAddModalOpen,
		closeAddModal,
		isEditModalOpen,
		closeEditModal,
		selectedTask,
	} = ModalContextUse();

	return (
		<div className='flex h-screen bg-white'>
			<Sidebar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/inbox' element={<Inbox />} />
				<Route path='/notes' element={<Notes />} />
				<Route path='/todo' element={<TodoList />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>

			<Modal isOpen={isAddModalOpen} onClose={closeAddModal} title='Add Task'>
				<TaskForm onSubmit={() => {}} buttonText='Add Task' />
			</Modal>

			<Modal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Edit Task'>
				<TaskForm
					initialData={selectedTask}
					onSubmit={() => {}}
					buttonText='Update'
				/>
			</Modal>
		</div>
	);
}

function App() {
	return (
		<Router>
			<ModalProvider>
				<AppContent />
			</ModalProvider>
		</Router>
	);
}

export default App;
