import { ServicesType, ServicesProps } from "./services";
import { ActionParamsProps } from "./actions";

export interface ReactionProps {
    id: string;
    service: ServicesType | '';
    reaction: ReactionsType | '';
    paramValues: Array<ActionParamsProps>;
}

export interface ReactionCardProps {
    services: Array<ServicesProps>;
    onDelete: (id: string) => void;
    onUpdate: (reactionCard: ReactionProps) => void;
    data: ReactionProps
}

export type ReactionsType = "send_email"
