import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useContainer } from 'typeorm';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionFilter } from './core/filter/global-exception.filter';
import { ValidationException } from './core/filter/validation.exception';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  useContainer(app, { fallback: true });
  app.setViewEngine('hbs');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errs = [];
        for (const error of errors) {
          if (error.constraints) {
            errs.push({
              field: error.property,
              message: Object.values(error.constraints).join(','),
            });
          } else {
            for (const nestedError of error.children) {
              for (const error of nestedError.children) {
                console.log(error);
                errs.push({
                  field: error.property,
                  message: Object.values(error.constraints).join(','),
                });
              }
            }
          }
        }
        return new ValidationException(errs);
      },
    }),
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT);
  console.log('app running on port http://localhost:' + process.env.PORT);
}
bootstrap();
