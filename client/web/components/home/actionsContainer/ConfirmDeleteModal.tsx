import Modal from 'react-modal';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }: ConfirmDeleteModalProps) => {
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className="w-[35%]"
        >
            <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg flex flex-col space-y-5">
                <h2 className="text-2xl text-white font-bold">Confirm Delete</h2>
                <p className="text-white text-lg">Are you sure you want to delete this node?</p>
                <div className="flex flex-line space-x-2 justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
      );
  };

export default ConfirmDeleteModal;
