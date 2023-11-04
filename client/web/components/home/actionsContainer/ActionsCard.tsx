import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteForever } from '@mui/icons-material';
import { NodeProps } from '../../../interfaces/nodes';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from 'react';
import deleteNode from '../../../methods/deleteNode';
import TriggerContainer from './TriggerContainer';
import ReactionContainer from './ReactionContainer';

interface ActionCardProps {
    userNode: NodeProps;
    userId: string;
    updateAllNodes: (userId: string) => void;
}

const ActionsCard = ({ userNode, userId, updateAllNodes }: ActionCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const confirmDelete = () => {
        deleteNode(userId, userNode.area_id);
        // TODO: check if behaves as expected (reload nodes after delete)
        updateAllNodes(userId);
        // window.location.reload();
        setIsModalOpen(false);
    };

    return (
        <Accordion sx={{ backgroundColor: "white", borderRadius: "5px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
                >
                <div className="flex items-center">
                    <div className="text-xl font-bold">{userNode.area_name}</div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="flex flex-col space-y-3">
                    <TriggerContainer action={userNode.action}/>

                    {userNode.reaction.map((reaction, index) => {
                        return (
                            <ReactionContainer key={index} reaction={reaction} />
                        )
                    })}

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded w-fit ml-auto"
                        onClick={handleOpenModal}
                    >
                        <DeleteForever />
                    </button>

                    <ConfirmDeleteModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={confirmDelete}
                    />
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

export default ActionsCard
