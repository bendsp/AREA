import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailingService } from '../mailing/mailing.service';
import { TimeService } from '../time/time.service'; 
import { selectData } from '../db/db.selectData';
import { SelectTimeData } from '../time/time.interface';
import { SelectEmailData } from '../mailing/mailing.interface';

@Injectable()
export class CheckTriggersService {
    constructor(
        public mailingServices: MailingService,
        public timeServices: TimeService,
    ) {}

    @Cron('0 */1 * * * *')
    async handleCron() {
        const trigger = [this.checkTime]
        const reaction = [this.launchEmail]
        try {
            trigger.forEach(async func => {
                const ListTrigger = await func();
                Logger.log("ListTimeTrigger", ListTrigger);
                if (ListTrigger.length != 0) {
                    reaction.forEach(async func => {
                        await func(ListTrigger);
                    });
                }
            });
        } catch (error) {
            // Handle any errors here
            Logger.error('Error in handleCron:', error);
        }
    }

    async checkTime(): Promise<number[]> {
        try {
            const TimeData: SelectTimeData[] = await selectData("Time") as SelectTimeData[];
            const ListTimeTrigger: number[] = [];

            for (const user of TimeData) {
                Logger.log("user", user);
                const data = await this.timeServices.getCurrentTimeByCity(user.city);
                Logger.log("data", data);
                let time = data.split(" ")[1];

                // Rest of your logic here
                Logger.log("Time", time);
                Logger.log("user.time", user.time);
                if (time === user.time) {
                    ListTimeTrigger.push(user.area_id);
                }
            }
            return ListTimeTrigger;
        } catch (error) {
            // Handle any errors here
            Logger.error('Error in checkTime:', error);
            return [];
        }
    }

    async launchEmail(ListTimeTrigger: number[]) {
        try {
            const EmailData: SelectEmailData[] = await selectData("Gmail") as SelectEmailData[];

            for (const email of EmailData) {
                for (const area_id of ListTimeTrigger) {
                    if (email.area_id >= area_id && email.area_id < area_id + 1) {
                        await this.mailingServices.sendMail({ email: email.email, subject: email.subject, message: email.message });
                    }
                }
            }
        } catch (error) {
            // Handle any errors here
            Logger.error('Error in launchEmail:', error);
        }
    }
}