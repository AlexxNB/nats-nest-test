import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpAppModule, NatsAppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Testovoe')
    .setDescription('API of the Testovoe')
    .setVersion('0.1')
    .build();

  const httpApp = await NestFactory.create(HttpAppModule);
  httpApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, document);

  await httpApp.listen(3000);

  const natsApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    NatsAppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: ['nats://192.162.246.63:4222'],
      },
    },
  );

  natsApp.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await natsApp.listen();
}
bootstrap();
