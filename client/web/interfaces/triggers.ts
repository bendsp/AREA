import { ServicesType, ServicesProps } from "./services";
import { ActionParamsProps, ActionsType } from "./actions";

export interface TriggerProps {
    service: ServicesType | '';
    action: ActionsType | '';
    paramValues: Array<ActionParamsProps>;
}

export interface TriggerCardProps {
    services: Array<ServicesProps>;
    data: TriggerProps;
    onUpdate: (triggerCard: TriggerProps) => void;
}
