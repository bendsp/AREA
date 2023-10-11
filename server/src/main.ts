import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export interface Status {
    statusCode: number;
    message: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
}

bootstrap();