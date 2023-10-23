import { SelectTimeData, TimeData } from "../time/time.interface";
import { SelectEmailData, MailData } from "../mailing/mailing.interface";

export type TableNames = 'Gmail' | 'Time' | 'User'| 'Area';
export type serviceName = 'Gmail' | 'Time';

export interface GmailTable  {
    TablesName: "Gmail";
    value: SelectEmailData;
}

export interface TimeTable  {
    TablesName: "Time";
    value : SelectTimeData ;
}

export interface UserTable {
    TablesName: "User";
    value: User;
}

export interface AreaTable{
    TablesName: "Area";
    value: SelectAreaData;
}

export interface PutData {
    user_id: string;
    area_id: number;
    TablesName: TableNames | "";
    value: MailData | TimeData | User | Area | {};
}

// export type PutData = {user_id: string; area_id: number;} & (GmailTable | TimeTable | UserTable | AreaTable | {TablesName: ""; value: {}});

export type Tables = GmailTable | TimeTable | UserTable | AreaTable;

export interface Area {
    area_name: string
}

export interface SelectAreaData {
    user_id: string;
    area_id: number;//"auth0|652bde86ab01a819c304f8a7"
    area_name: string;
}

export interface User {
    user_id: string;
    email: string;
    username: string;
    nb_area: number;
}
