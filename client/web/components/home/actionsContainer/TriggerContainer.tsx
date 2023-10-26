import { NodeActionProps } from '../../../interfaces/nodes';

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

export default TriggerContainer;
