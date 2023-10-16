import { TimeData } from "../time/time.interface";
import { MailData } from "../mailing/mailing.interface";

export type TableNames = 'Gmail' | 'Time' | 'User'| 'Area';
export type serviceName = 'Gmail' | 'Time';

export interface PutData {
    user_id: string;
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
    user_id: string;
    email: string;
    username: string;
    nb_area: number;
}
