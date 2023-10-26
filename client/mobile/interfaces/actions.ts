export interface ActionParamsProps {
    name: string;
    type: string;
    value: string;
}
export interface ActionProps {
    name: string;
    description: string;
    params: Array<ActionParamsProps>;
}

export type ActionsType = "get_city_time"
