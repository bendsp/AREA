import ServicesCard from "./ServicesCard";

import { ServicesProps } from "../../../interfaces/services";

interface ServicesContainerProps {
    services: Array<ServicesProps>;
}

const ServicesContainer = ({ services }: ServicesContainerProps) => {
    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5">
            <h2 className="bg-yellow-500 w-fit rounded-xl px-2 text-xl font-bold text-[#1e1e1e] mb-4">
                Here are the services you can use!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => {
                    return <ServicesCard key={service.name} service={service} />
                })}
            </div>
        </div>
    )
}

export default ServicesContainer;
