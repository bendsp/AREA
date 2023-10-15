export interface ActionParamsProps {
    name: string;
    type: string;
    value: string;
}
export interface ActionsProps {
    name: string;
    description: string;
    params: Array<ActionParamsProps>;
}

export interface ServicesProps {
    name: string;
    actions: Array<ActionsProps>;
    reactions: Array<ActionsProps>;
}

export type ServicesType = "Time" | "Gmail"

export type ActionsType = "get_city_time"

export type ReactionsType = "send_email"
