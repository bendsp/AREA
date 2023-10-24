import React, { useState } from 'react';
import Modal from 'react-modal';

interface NewActionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateAction: (name: string) => void;
}

const NewActionModal = ({ isOpen, onRequestClose, onCreateAction }: NewActionModalProps) => {
  const [name, setName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreateAction = () => {
    onCreateAction(name);
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="w-[35%]">
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl mb-4 text-white font-bold">Create New Action</h2>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
          placeholder='Give your action a name'
        />
        <button
          onClick={handleCreateAction}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${name ? 'cursor-pointer' : 'cursor-not-allowed'} ${name ? 'hover:bg-blue-600' : 'opacity-50'}`}
          disabled={!name}
        >
          Create
        </button>
      </div>
    </Modal>
  );
};

export default NewActionModal;
