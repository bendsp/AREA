import { ActionParamsProps, ActionsType, ServicesType } from "./services";

export interface TriggerProps {
    service: ServicesType;
    action: ActionsType;
    paramValues: Array<ActionParamsProps>;
}
