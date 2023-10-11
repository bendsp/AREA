import { ServicesType, ReactionsType, ServicesProps } from "./services";

export interface ReactionCardData {
    id: string;
    service: ServicesType | '';
    reaction: ReactionsType | '';
    paramValues: Array<string>;
}

export interface ReactionCardProps {
    services: Array<ServicesProps>;
    onDelete: (id: string) => void;
    onUpdate: (reactionCard: ReactionCardData) => void;
    data: ReactionCardData
}
