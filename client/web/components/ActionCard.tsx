import { ActionsProps } from '../interfaces/services'

interface ActionCardProps {
    actions: Array<ActionsProps>;
}

const ActionCard = ({ actions }: ActionCardProps) => {
    return (
        <div>
            { actions.map((item) => {
                return (
                    <div key={item.name} className="bg-gray-200 rounded-xl px-3 pt-2 pb-3">
                        <div className="text-lg font-bold pb-2 pl-1">
                            {item.description}
                        </div>
                        { item.params.length > 0 &&
                            <div className="bg-gray-100 rounded-2xl px-3 py-2">
                                <p className="text-gray-400 font-bold pr-2">parameters:</p>
                                { item.params.map((param) => {
                                    return (
                                        <div key={param.name} className="pl-5 flex flex-line">
                                            <p className="font-bold">- {param.name}</p>
                                            <p className="italic">({param.type})</p>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default ActionCard;
