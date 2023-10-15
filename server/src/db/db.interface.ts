import { TimeData } from "../time/time.interface";
import { MailData } from "../mailing/mailing.interface";

export type TableNames = 'Email' | 'Time' | 'User'| 'Area';
export type serviceName = 'Email' | 'Time';

export interface PutData {
    user_id: number;
    area_id: number;
    TablesName: TableNames | "";
    value: MailData | TimeData | User | Area | {};
}

export interface Area {
    area_name: string
}

export interface AreaData {
    area_id: number;//"auth0|652bde86ab01a819c304f8a7"
    area_name: string;
}

export interface User {
    user_id: number;
    email: string;
    username: string;
    nb_area: number;
}
