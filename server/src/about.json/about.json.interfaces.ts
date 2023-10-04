
export interface Service {
    name: string;
    actions: Action[];
    reactions: Reaction[];
}

export interface Action { 
    name: "get_city_time",
    description: string;
}

export interface Reaction {
    name: "send_email",
    description: string;
}
