import { ServicesProps } from "../../interfaces/services";
import { useState, useEffect } from "react";
import { TriggerProps } from "../../interfaces/triggers";

interface TriggerCardProps {
    services: Array<ServicesProps>;
    onUpdate: (triggerCard: TriggerProps) => void;
}

const TriggerCard = ({ services, onUpdate }: TriggerCardProps) => {
    const [selectedService, setSelectedService] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [paramValues, setParamValues] = useState([])

    const handleApplyClick = () => {
        console.log(`Selected Service: ${selectedService}`);
        console.log(`Selected Action: ${selectedAction}`);
        console.log('ParamValues:', paramValues);
    };

    useEffect(() => {
        setSelectedService(services[0]?.name || '');
        setSelectedAction(services[0]?.actions[0]?.name || '');
    }, [services]);

    return (
        <div className="flex flex-col bg-[#1e1e1e] text-[#121212] rounded-xl p-5 space-y-5">
            <div className="bg-blue-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                TRIGGER
            </div>
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
                <div className="ml-auto flex-1 space-y-3">
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
                    <div className="bg-white rounded-sm p-3 space-y-2">
                        {services
                            .find((service) => service.name === selectedService)
                            ?.actions.find((action) => action.name === selectedAction)
                            ?.params.map((param, index) => (
                              <div key={index} className="flex flex-line space-x-5">
                                <label htmlFor={param.name} className="pt-2">
                                  {param.name}
                                </label>
                                <input
                                  type="text"
                                  id={param.name}
                                  className="border p-2 rounded w-full"
                                  onChange={(e) => setParamValues({ ...paramValues, [param.name]: e.target.value })}
                                />
                              </div>
                            ))}
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
