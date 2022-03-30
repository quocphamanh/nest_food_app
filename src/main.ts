import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app, { fallback: true });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT);
  console.log('app running on port http://localhost:' + process.env.PORT);
}
bootstrap();
