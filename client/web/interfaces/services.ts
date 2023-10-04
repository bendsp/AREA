export interface ActionParamsProps {
    name: string;
    type: string;
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
