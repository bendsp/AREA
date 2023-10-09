import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export interface Status {
    statusCode: number;
    message: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
  while (true) {
    await delay(1000);
  }
}
bootstrap();