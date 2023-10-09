import { ServicesProps } from "../../interfaces/services";
import { useState, useEffect } from "react";

interface TriggerCardProps {
    services: Array<ServicesProps>;
}

const TriggerCard = ({ services }: TriggerCardProps) => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedAction, setSelectedAction] = useState('');

    const handleApplyClick = () => {
        console.log(`Selected Service: ${selectedService}`);
        console.log(`Selected Action: ${selectedAction}`);
    };

    useEffect(() => {
        setSelectedService(services[0]?.name || '');
        setSelectedAction(services[0]?.actions[0]?.name || '');
    }, [services]);

    return (
        <div className="flex flex-col bg-[#1e1e1e] text-[#121212] rounded-xl p-5 space-y-5">
            <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-4">
                    <label htmlFor="serviceDropdown" className="text-[#ffffff]">
                        Select a Service:
                    </label>
                    <select
                        id="serviceDropdown"
                        className="border p-2 rounded"
                        onChange={(e) => setSelectedService(e.target.value)}
                        value={selectedService}
                    >
                        {services.map((service, index) => (
                            <option key={index} value={service.name}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="ml-auto bg-[#ffffff] rounded-xl flex-1">
                    {/* <label htmlFor="actionDropdown" className="text-[#121212]">
                        Select an Action:
                    </label> */}
                    <select
                        id="actionDropdown"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setSelectedAction(e.target.value)}
                        value={selectedAction}
                    >
                        {services
                            .find((service) => service.name === selectedService)
                            ?.actions.map((action, index) => (
                                <option key={index} value={action.name}>
                                    {action.description}
                                </option>
                            ))}
                    </select>
                    <div>
                        Params
                        {/* {services
                            .find((service) => service.name === selectedService)
                            ?.actions.find((action) => action.name === selectedAction)
                            ?.params.map((param, index) => (
                                <div key={index}>
                                    <label htmlFor={param.name}>{param.name}</label>
                                    <input
                                        type="text"
                                        id={param.name}
                                        className="border p-2 rounded w-full"
                                    />
                                </div>
                            ))} */}
                    </div>
                </div>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-[fit-content] self-end"
                onClick={handleApplyClick}
            >
                Apply
            </button>
        </div>
    );
};

export default TriggerCard;
