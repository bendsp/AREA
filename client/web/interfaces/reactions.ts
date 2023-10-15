import { ServicesType, ReactionsType, ServicesProps } from "./services";
import { ActionParamsProps } from "./services";

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
