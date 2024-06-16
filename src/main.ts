import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const urlLocal = configService.get<string>('URL_LOCAL');

  app.enableCors({
    origin: [urlLocal, 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(3010);
}
bootstrap();
