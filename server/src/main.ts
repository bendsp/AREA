import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
  // while(true) {
  //   console.log('Hello world');
  //   await delay(1000) 
  // }
}
bootstrap();
