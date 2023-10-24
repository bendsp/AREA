import { ServicesType } from "../../interfaces/services";
import { ActionParamsProps, ActionsType } from "../../interfaces/actions";
import { TriggerProps, TriggerCardProps } from "../../interfaces/triggers";
import { ChangeEvent } from "react";

const TriggerCard = ({ services, data, onUpdate }: TriggerCardProps) => {
    const handleSelectService = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedService = event.target.value as ServicesType;
        const updatedAction = services.find((service) => service.name === updatedService)?.actions?.[0]?.name ?? '';
        onUpdate({ ...data, service: updatedService, action: updatedAction as TriggerProps['action'] });
    }

    const handleSelectAction = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedAction = event.target.value as ActionsType;
        onUpdate({ ...data, action: updatedAction});
    }

    const handleSelectParam = (event: ChangeEvent<HTMLInputElement>, param: ActionParamsProps) => {
        const updatedParamValues = data.paramValues.map(existingParam => {
            if (existingParam.name === param.name) {
                return { ...existingParam, value: event.target.value };
            }
            return existingParam;
        });

        onUpdate({ ...data, paramValues: updatedParamValues });
    }

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
                        onChange={handleSelectService}
                        value={data.service}
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
                        onChange={handleSelectAction}
                        value={data.action}
                    >
                        {services
                            .find((service) => service.name === data.service)
                            ?.actions.map((action, index) => (
                                <option key={index} value={action.name}>
                                    {action.description}
                                </option>
                            ))}
                    </select>
                    <div className="bg-white rounded-sm p-3 space-y-2">
                        {services
                            .find((service) => service.name === data.service)
                            ?.actions.find((action) => action.name === data.action)
                            ?.params.map((param, index) => (
                              <div key={index} className="flex flex-line space-x-5">
                                <label htmlFor={param.name} className="pt-2">
                                  {param.name}
                                </label>
                                <input
                                  type="text"
                                  id={param.name}
                                  className="border p-2 rounded w-full"
                                  onChange={(event) => {handleSelectParam(event, param)}}
                                />
                              </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TriggerCard;
