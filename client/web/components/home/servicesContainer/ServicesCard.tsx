import { ServicesProps } from "../../../interfaces/services";

import ActionCard from "./ActionCard";

interface ServicesCardProps {
    service: ServicesProps;
}

const ServicesCard = ({ service }: ServicesCardProps) => {
    return (
        <div className="bg-[#292929] rounded-2xl p-5 space-y-4">
            <h3 className="bg-green-600 w-full text-center rounded-xl py-1 text-xl font-bold text-[#1e1e1e]">{service.name}</h3>
            { service.actions.length > 0 &&
                <div className="bg-white rounded-xl p-3 space-y-3">
                    <p className="bg-blue-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                        TRIGGERS
                    </p>
                    <ActionCard actions={service.actions} />
                </div>
            }
            { service.reactions.length > 0 &&
                <div className="bg-white rounded-xl p-3 space-y-3">
                    <p className="bg-red-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                        REACTIONS
                    </p>
                    <ActionCard actions={service.reactions} />
                </div>
            }
        </div>
    )
}

export default ServicesCard
