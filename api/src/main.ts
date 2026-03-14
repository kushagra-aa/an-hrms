/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOrigins =
    process.env.CORS_ORIGIN ||
    process.env.CORS_ORIGINS ||
    'http://localhost:4200';
  const allowedOrigins = corsOrigins.split(',').map((o) => o.trim());

  app.enableCors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not Allowed by CORS'));
      }
    },
    methods: 'HEAD, GET, POST, PATCH, PUT, DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
