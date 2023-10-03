export type Action = "timer:get_city_time" | "timer:get_city_time"
export type Reaction = "outlook:send_email"

export interface Service {
    name: string;
    actions: Action[];
    reactions: Reaction[];
}

