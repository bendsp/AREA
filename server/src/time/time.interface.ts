export interface TimeData {
    time: string;
    city: string;
}

export interface PostrgessTime {
    area_id: number;
    user_id: number;
}


export type SelectTimeData = TimeData & PostrgessTime;