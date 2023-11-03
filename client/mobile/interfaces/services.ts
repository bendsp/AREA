import { ActionProps } from "./actions";

export interface ServicesProps {
    name: string;
    actions: Array<ActionProps>;
    reactions: Array<ActionProps>;
}

export type ServicesType = "Time" | "Gmail" | "SendRandomPokemon";

