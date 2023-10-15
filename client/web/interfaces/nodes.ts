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
interface NodeReactionProps {
    serviceName: string;
    body: EmailBodyProps | any;
}

//* Node
export interface NodeProps {
    user_id: number;
    area_name: string;
    action: NodeActionProps;
    reaction: Array<NodeReactionProps>;
}
