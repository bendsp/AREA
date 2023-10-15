import { TimeData } from "src/time/time.interface";
import { MailData } from "src/mailing/mailing.interface";
import { TableNames } from "src/db/db.interface";

export interface ClientData {
    user_id: number;
    area_id: number;
    area_name: string;
    action: {
        serviceName: TableNames | "";
        body: TimeData | MailData | {};
    },
    reaction: {
        serviceName: TableNames | "";
        body: TimeData | MailData | {};
    }[]

}

export interface SelectAreaData {
    user_id: number;
    area_name: string;
    area_id: number;
}