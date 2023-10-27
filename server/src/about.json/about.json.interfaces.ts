
export interface Service {
    name: string;
    actions: Action[];
    reactions: Reaction[];
}

export interface Param {
    name: string;
    type: "string" | "number" | "boolean";
}

export interface Action { 
    name: "get_city_time",
    description: string;
    params: Param[];
}

export interface Reaction {
    name: "send_email" | "send_random_pokemon",
    description: string,
    params: Param[];
}
