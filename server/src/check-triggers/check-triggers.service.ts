import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailingService } from '../mailing/mailing.service';
import { TimeService } from '../time/time.service'; // Corrected import path
import { selectData } from '../db/db.selectData';
import { SelectTimeData } from '../time/time.interface';
import { SelectEmailData } from '../mailing/mailing.interface';

@Injectable()
export class CheckTriggersService {

    constructor(
        private readonly mailingService: MailingService,
        private readonly timeService: TimeService,
    ) {}

    @Cron('0 */1 * * * *')
    async handleCron() {
        try {
            const ListTimeTrigger: number[] = await this.checkTime();
            if (ListTimeTrigger.length > 0) {
                await this.launchEmail(ListTimeTrigger);
            }
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
                Logger.log("user.city :"+ user.city);
                const data = await this.timeService.getCurrentTimeByCity(user.city);
                let time = data.split(" ")[1];
                if ((data.split(" ")[2] === "PM" && parseInt(data.split(" ")[1].split(":")[0]) < 12) || (data.split(" ")[2] === "AM" && parseInt(data.split(" ")[1].split(":")[0]) === 12)) {
                    time = (parseInt(data.split(" ")[1].split(":")[0]) + 12).toString() + ":" + data.split(" ")[1].split(":")[1];
                } else {
                    time = data.split(" ")[1].split(":")[0] + ":" + data.split(" ")[1].split(":")[1];
                }
                // Rest of your logic here
                Logger.log("Time"+ time);
                Logger.log("user.time"+ user.time);
                if (time === user.time) {
                    ListTimeTrigger.push(user.area_id);
                }
            }
            return ListTimeTrigger;
        } catch (error) {
            // Handle any errors here
            Logger.error('Error in checkTime:'+ error );
            return [];
        }
    }

    async launchEmail(ListTimeTrigger: number[]) {
        try {
            const EmailData: SelectEmailData[] = await selectData("Gmail") as SelectEmailData[];

            for (const email of EmailData) {
                for (const area_id of ListTimeTrigger) {
                    if (email.area_id > area_id && email.area_id < area_id + 1) {
                        await this.mailingService.sendMail(email);
                    }
                }
            }
        } catch (error) {
            // Handle any errors here
            Logger.error('Error in launchEmail:', error);
        }
    }
}