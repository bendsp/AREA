import { ChangeEvent } from "react"

import { ServicesType } from "../../interfaces/services"
import { ActionParamsProps } from "../../interfaces/actions"
import { ReactionProps, ReactionCardProps, ReactionsType } from "../../interfaces/reactions"

const ReactionCard = ({ services, onDelete, onUpdate, data }: ReactionCardProps) => {
    const handleSelectService = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedService = event.target.value as ServicesType;
        const updatedReaction = services.find((service) => service.name === updatedService)?.reactions?.[0]?.name ?? '';
        onUpdate({ ...data, service: updatedService, reaction: updatedReaction as ReactionProps['reaction'] });
    }

    const handleSelectReaction = (event: ChangeEvent<HTMLSelectElement>) => {
        const updatedReaction = event.target.value as ReactionsType;
        onUpdate({ ...data, reaction: updatedReaction});
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
            <div className="bg-red-500 w-fit rounded-xl px-2 text-lg font-bold text-[#1e1e1e]">
                REACTION
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
                        onChange={handleSelectReaction}
                        value={data.reaction}
                    >
                        {services
                            .find((service) => service.name === data.service)
                            ?.reactions.map((reaction, index) => (
                                <option key={index} value={reaction.name}>
                                    {reaction.description}
                                </option>
                            ))}
                    </select>
                    <div className="bg-white rounded-sm p-3 space-y-2">
                        {services
                            .find((service) => service.name === data.service)
                            ?.reactions.find((reaction) => reaction.name === data.reaction)
                            ?.params.map((param, index) => (
                              <div key={index} className="flex flex-line space-x-5">
                                <label htmlFor={param.name} className="pt-2">
                                  {param.name}
                                </label>
                                <input
                                  type="text"
                                  id={param.name}
                                  className="border p-2 rounded w-full"
                                  onChange={(event) => handleSelectParam(event, param)}
                                />
                              </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-line self-end space-x-5">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded w-[fit-content]"
                    onClick={() => {
                        onDelete(data.id)
                    }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ReactionCard
