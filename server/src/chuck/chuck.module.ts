import { Module } from '@nestjs/common';
import { ChuckService } from './chuck.service';
import { ChuckController } from './chuck.controller';

@Module({
  providers: [ChuckService],
  controllers: [ChuckController],
  exports: [ChuckService],
})
export class ChuckModule {}
