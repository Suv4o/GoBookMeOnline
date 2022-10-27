import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function setupApp(app: INestApplication) {
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || [process.env.FRONTEND_URL].indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api');
}
