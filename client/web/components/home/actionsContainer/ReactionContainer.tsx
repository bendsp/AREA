import { NodeReactionProps } from "../../../interfaces/nodes";

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

export default ReactionContainer;
