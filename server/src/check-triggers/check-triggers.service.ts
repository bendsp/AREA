import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { MailingService } from '../mailing/mailing.service';
import { TimeService } from 'src/time/time.service';
import { selectData } from 'src/db/db.selectData';
import { SelectTimeData } from 'src/time/time.interface';
import { SelectEmailData } from 'src/mailing/mailing.interface';

@Injectable()
export class CheckTriggersService {
    private readonly logger = new Logger(CheckTriggersService.name);

    constructor(
      private readonly mailingService: MailingService,
        private readonly timeService: TimeService,
    ) {}
  
    @Cron('0 */1 * * * *')
    async handleCron() {
        const TimeData: SelectTimeData[] = await selectData("Time") as SelectTimeData[];
        const EmailData: SelectEmailData[] = await selectData("Email") as SelectEmailData[];
        TimeData.forEach((user) => {
            this.timeService.getCurrentTimeByCity(user.city).then((data) => {
                let time = data.split(" ")[1];
                if ((data.split(" ")[2] === "PM" && parseInt(data.split(" ")[1].split(":")[0]) < 12) || (data.split(" ")[2] === "AM" && parseInt(data.split(" ")[1].split(":")[0]) === 12)) {
                    time = (parseInt(data.split(" ")[1].split(":")[0]) + 12).toString() + ":" + data.split(" ")[1].split(":")[1];
                } else {
                    time = data.split(" ")[1].split(":")[0] + ":" + data.split(" ")[1].split(":")[1];
                }
                Logger.log("Time", time);
                Logger.log("user.time", user.time);
                if (time === user.time) {
                    EmailData.forEach((email) => {
                        Logger.log("email.email", email.email);
                        Logger.log("email.subject", email.subject);
                        Logger.log("email.message", email.message);
                        if (email.area_id > user.area_id && email.area_id < user.area_id + 1) {
                            this.mailingService.sendMail({ email: email.email, subject: email.subject, message: email.message });
                        }
                    });
                }
            });

        });
        
        this.logger.debug('Called when the current second is 10');
    //Logger.log('Called when the current second is 45');
    //this.mailingService.sendMail({ email: 'kentinpaille@gmail.com', subject: 'test', message: 'test' });
    }
}
