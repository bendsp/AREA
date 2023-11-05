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
            <div className="font-bold border-dashed border-2 border-black rounded-xl px-2">
                {action.serviceName}
            </div>
            <div>-&gt;</div>
            <div className="flex space-x-2">
                {
                    action.body.map((body: NodeActionProps["body"], index: number) => (
                        <div key={index} className="font-bold border-dotted border-2 border-black rounded-xl px-2">
                            <span>
                                {index === 0 ? "When" : "and"}
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

export default TriggerContainer;
