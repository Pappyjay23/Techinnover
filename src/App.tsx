import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Inbox from "./pages/Inbox";
import Notes from "./pages/Notes";
import TodoList from "./pages/TodoList";
import { ModalContextUse, ModalProvider } from "./context/ModalContext";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function AppContent() {
	const {
		isAddModalOpen,
		closeAddModal,
		isEditModalOpen,
		closeEditModal,
		isDeleteModalOpen,
		selectedTask,
		modalStatus,
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
				<TaskForm
					onSubmit={closeAddModal}
					buttonText='Add Task'
					status={modalStatus || "TODO"}
				/>
			</Modal>

			<Modal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				title='Edit Task'>
				{selectedTask && (
					<TaskForm
						initialData={selectedTask}
						onSubmit={closeEditModal}
						buttonText='Update'
						status={selectedTask.status}
					/>
				)}
			</Modal>

			{isDeleteModalOpen && <DeleteConfirmationModal />}
		</div>
	);
}

function App() {
	return (
		<Router>
			<TaskProvider>
				<ModalProvider>
					<AppContent />
					<ToastContainer position="bottom-right" autoClose={3000} />
				</ModalProvider>
			</TaskProvider>
		</Router>
	);
}

export default App;
