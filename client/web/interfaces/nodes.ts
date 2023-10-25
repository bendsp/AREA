//* Node Actions
interface TimeBodyProps {
    city: string;
    time: string;
}
export interface NodeActionProps {
    serviceName: string;
    body: TimeBodyProps | any;
}

//* Node Reactions
interface EmailBodyProps {
    email: string;
    subject: string;
    message: string;
}
export interface NodeReactionProps {
    serviceName: string;
    body: EmailBodyProps | any;
}

//* Node
export interface NodeProps {
    user_id: string;
    area_id: string;
    area_name: string;
    action: NodeActionProps;
    reaction: Array<NodeReactionProps>;
}
