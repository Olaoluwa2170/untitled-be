import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import allowedOrigins from './config/allowedOrigin';
import * as dotenv from 'dotenv';
// import { Response, Request, NextFunction } from 'express';

dotenv.config();

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  // app.enableCors();
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
