import { Module } from '@nestjs/common';
import { CheckTriggersService } from './check-triggers.service';
import { CheckTriggersController } from './check-triggers.controller';
import { MailingModule } from '../mailing/mailing.module';
import { TimeModule } from '../time/time.module';

@Module({
    imports: [MailingModule, TimeModule],
    controllers: [CheckTriggersController],
    providers: [CheckTriggersService],
})
export class CheckTriggersModule {}
