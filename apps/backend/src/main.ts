import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3001;
  if(process.env.NODE_ENV === "development"){
    const config = new DocumentBuilder()
    .setTitle("Ichariba-Link Project")
    .setDescription("API description")
    .setVersion("1.0")
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log(`http://localhost:${port}/api`)
  }

  await app.listen(port);
}
bootstrap();
