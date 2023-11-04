export interface TimeData {
  time: string;
  city: string;
  diff: number;
}

export interface PostrgessTime {
  area_id: number;
  user_id: string;
}

export type SelectTimeData = TimeData & PostrgessTime;
