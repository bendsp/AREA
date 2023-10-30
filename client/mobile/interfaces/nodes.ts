//* Node Actions
interface TimeBodyProps {
    city: string;
    time: string;
}
interface NodeActionProps {
    serviceName: string;
    body: TimeBodyProps | any;
}

//* Node Reactions
interface EmailBodyProps {
    email: string;
    subject: string;
    message: string;
}

interface PokemonBodyProps {
    email: string;
}

interface NodeReactionProps {
    serviceName: string;
    body: EmailBodyProps | PokemonBodyProps | any;
}

//* Node
export interface NodeProps {
    user_id: string;
    area_name: string;
    action: NodeActionProps;
    reaction: Array<NodeReactionProps>;
}
