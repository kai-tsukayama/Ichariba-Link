import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;

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
    .addApiKey(
      { type: 'apiKey', name: 'x-user-id', in: 'header' },
      'x-user-id',
      )
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log(`http://localhost:${port}/api`)
  }

  await app.listen(port);
}
bootstrap();
