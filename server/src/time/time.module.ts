import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';

@Module({
  controllers: [TimeController],
  providers: [TimeService]
})
export class TimeModule {}
