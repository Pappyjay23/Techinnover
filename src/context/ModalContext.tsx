import { createContext, ReactNode, useContext, useState } from 'react';
import { Task } from './TaskContext';

interface ModalContextType {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedTask: Task | null;
  modalStatus: Task['status'] | null;
  openAddModal: (status: Task['status']) => void;
  closeAddModal: () => void;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  openDeleteModal: (task: Task) => void;
  closeDeleteModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalStatus, setModalStatus] = useState<Task['status'] | null>(null);

  const openAddModal = (status: Task['status']) => {
    setModalStatus(status);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setModalStatus(null);
    setIsAddModalOpen(false);
  };
  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isAddModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        selectedTask,
        modalStatus,
        openAddModal,
        closeAddModal,
        openEditModal,
        closeEditModal,
        openDeleteModal,
        closeDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function ModalContextUse() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}