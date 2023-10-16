import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule], 
  controllers: [TimeController],
  providers: [TimeService],
  exports: [TimeService]
})
export class TimeModule {}
