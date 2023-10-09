import { ServicesProps } from "../../../interfaces/services";

import ActionCard from "./ActionCard";

interface ServicesCardProps {
    service: ServicesProps;
}

const ServicesCard = ({ service }: ServicesCardProps) => {
    return (
        <div className="bg-green-700 rounded-2xl p-5 space-y-3">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <div className="bg-white rounded-xl p-3 space-y-2">
                <p className="font-bold">Actions:</p>
                <ActionCard actions={service.actions} />
            </div>
            <div className="bg-white rounded-xl p-3 space-y-2">
                <p className="font-bold">Reactions:</p>
                <ActionCard actions={service.reactions} />
            </div>
        </div>
    )
}

export default ServicesCard
