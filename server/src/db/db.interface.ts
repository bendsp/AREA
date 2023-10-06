import { TimeData } from "../time/time.interface";
import { MailData } from "../mailing/mailing.interface";

export interface PutData {
    id: number;
    TablesName: string;
    value: MailData | TimeData | User;
}

export interface User {
    gmail: string;
    name: string;
}
