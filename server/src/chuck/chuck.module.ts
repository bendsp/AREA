import { Module } from '@nestjs/common';
import { ChuckService } from './chuck.service';
import { ChuckController } from './chuck.controller';
import { MailingModule } from 'src/mailing/mailing.module';
@Module({
  imports: [MailingModule],
  controllers: [ChuckController],
  providers: [ChuckService],
  exports: [ChuckService],
})
export class ChuckModule {}
