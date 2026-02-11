import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 本文サイズ上限を拡大（画像Base64送信用）
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // 開発用CORS許可: フロント(3000)からのアクセスを許可
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: false,
  });
  if(process.env.NODE_ENV === "development"){
    const config = new DocumentBuilder()
    .setTitle("Ichariba-Link Project")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log(`http://localhost:${port}/api`)
  }

  await app.listen(port);
}
bootstrap();
