export interface ActionsProps {
    name: string;
    description: string;
}

export interface ServicesProps {
    name: string;
    actions: Array<ActionsProps>;
    reactions: Array<ActionsProps>;
}
