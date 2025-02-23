import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[4px]">
      <div
        className="fixed inset-0 bg-[#263238]/60 transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white h-[95%] md:h-fit md:max-h-[95%] overflow-scroll rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <IoCloseOutline className="w-6 h-6 text-[#848585]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;