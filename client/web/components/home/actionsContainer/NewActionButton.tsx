import { useRouter } from 'next/router';
import { useState } from 'react';

import { ServicesProps } from '../../../interfaces/services';

import NewActionModal from './NewActionModal';

interface NewActionButtonProps {
    services: Array<ServicesProps>;
  }

const NewActionButton = ({ services }: NewActionButtonProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAction = (name: string) => {
    router.push({
      pathname: '/newAction',
      query: { services: JSON.stringify(services), name }
    });
  };

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="w-full border-dashed border-2 border-white hover:bg-[#292929] rounded-sm p-3"
      >
        <div className="text-center font-bold text-white">
          Create New Action
        </div>
      </button>
      <NewActionModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onCreateAction={handleCreateAction}
      />
    </div>
  );
};

export default NewActionButton;
