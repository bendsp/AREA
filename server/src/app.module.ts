import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutJsonService } from './about.json/about.json.service';
import { AboutJsonController } from './about.json/about.json.controller';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';


@Module({
  imports: [],
  controllers: [AppController, AboutJsonController, LoginController],
  providers: [AppService, AboutJsonService, LoginService],
})
export class AppModule {}
