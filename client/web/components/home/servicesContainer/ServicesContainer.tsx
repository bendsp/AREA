import ServicesCard from "./ServicesCard";

import { ServicesProps } from "../../../interfaces/services";

interface ServicesContainerProps {
    services: Array<ServicesProps>;
}

const ServicesContainer = ({ services }: ServicesContainerProps) => {
    const nbServices = services.length;

    const nbTriggers = services.reduce((acc, service) => {
        return acc + service.actions.length;
    }, 0);

    const nbReactions = services.reduce((acc, service) => {
        return acc + service.reactions.length;
    }, 0);

    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5">
            <div className="flex flex-line">
                <h2 className="bg-yellow-500 w-fit rounded-xl px-2 text-xl font-bold text-[#1e1e1e] mb-4">
                    Here are the services you can use!
                </h2>
                <div className="ml-auto bg-[#292929] w-fit rounded-xl px-2 text-xl font-bold text-green-600 mb-4">
                    {nbServices} {nbServices > 1 ? "services" : "service"}
                    {nbTriggers > 0 && nbReactions > 0 && " - "}
                    {nbTriggers > 0 && nbTriggers} {nbTriggers > 1 ? "triggers" : "trigger"}
                    {nbTriggers > 0 && nbReactions > 0 && " - "}
                    {nbReactions > 0 && nbReactions} {nbReactions > 1 ? "reactions" : "reaction"}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => {
                    return <ServicesCard key={service.name} service={service} />
                })}
            </div>
        </div>
    )
}

export default ServicesContainer;
