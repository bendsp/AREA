import { Module } from '@nestjs/common';
import { CheckTrigersService } from './check-trigers.service';
import { CheckTrigersController } from './check-trigers.controller';
import { MailingModule } from '../mailing/mailing.module';
import { TimeModule } from '../time/time.module';

@Module({
    imports: [MailingModule, TimeModule],
    controllers: [CheckTrigersController],
    providers: [CheckTrigersService],
})
export class CheckTrigersModule {}
