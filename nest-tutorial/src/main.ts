import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //prefijo de ruta global, osea para todas las rutas de la app
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT);
}
bootstrap();
