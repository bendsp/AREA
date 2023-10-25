import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DeleteForever } from '@mui/icons-material';
import { NodeProps, NodeActionProps, NodeReactionProps } from '../../../interfaces/nodes';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { useState } from 'react';

interface TriggerContainerProps {
    action: NodeActionProps;
}

const TriggerContainer = ({ action }: TriggerContainerProps) => {
    return (
        <div className="flex flex-line items-center space-x-2">
            <div className="bg-blue-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                TRIGGER
            </div>
            <div>-&gt;</div>
            <div className="font-bold border-dotted border-2 border-black rounded-xl px-2">
                {action.serviceName}
            </div>
        </div>
    )
}

interface ReactionContainerProps {
    reaction: NodeReactionProps;
}

const ReactionContainer = ({ reaction }: ReactionContainerProps) => {
    return (
        <div className="flex flex-line items-center space-x-2">
            <div className="bg-red-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                REACTION
            </div>
            <div>-&gt;</div>
            <div className="font-bold border-dotted border-2 border-black rounded-xl px-2">
                {reaction.serviceName}
            </div>
        </div>
    )
}

const ActionsCard = (userNode: NodeProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const confirmDelete = () => {
        // TODO: call delete node function
        console.log('DELETE', userNode.area_id);
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
