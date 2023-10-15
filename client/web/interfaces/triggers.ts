import { ActionParamsProps } from "./services";

export interface TriggerProps {
    service: string;
    action: string;
    paramValues: Array<ActionParamsProps>;
}
