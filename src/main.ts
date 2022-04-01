import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app, { fallback: true });
  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      skipMissingProperties: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT);
  console.log('app running on port http://localhost:' + process.env.PORT);
}
bootstrap();
