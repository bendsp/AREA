export type Action = "get_city_time"
export type Reaction = "send_email"

export interface Service {
    name: string;
    actions: Action[];
    reactions: Reaction[];
}

