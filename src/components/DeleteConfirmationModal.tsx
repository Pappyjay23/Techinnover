import React from 'react';
import { ModalContextUse } from '../context/ModalContext';
import { TaskContextUse } from '../context/TaskContext';

const DeleteConfirmationModal: React.FC = () => {
  const { selectedTask, closeDeleteModal } = ModalContextUse();
  const { deleteTask } = TaskContextUse();

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      closeDeleteModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition-all duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;