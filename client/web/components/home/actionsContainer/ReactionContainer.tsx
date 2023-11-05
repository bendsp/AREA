import { NodeReactionProps } from "../../../interfaces/nodes";

interface ReactionContainerProps {
    reaction: NodeReactionProps;
}

const ReactionContainer = ({ reaction }: ReactionContainerProps) => {
    return (
        <div className="flex flex-line items-start space-x-2">
            <div className="bg-red-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                REACTION
            </div>
            <div className="font-bold border-dashed border-2 border-black rounded-xl px-2">
                {reaction.serviceName}
            </div>
            <div>-&gt;</div>
            <div className="flex space-x-2">
                {
                    reaction.body.map((body: NodeReactionProps["body"], index: number) => (
                        <div key={index} className="font-bold border-2 border-black border-dotted rounded-xl px-2 h-fit w-fit">
                            <span>
                                {index === 0 ? "Then" : "and"}
                            </span>
                            <span className="text-blue-500"> {body[0]}</span>
                            <span> is </span>
                            <span className="text-blue-500">{body[1]}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ReactionContainer;
