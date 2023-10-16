import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Testovoe')
    .setDescription('API of the Testovoe')
    .setVersion('0.1')
    .build();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // не проверял, но этого достаточно должно быть
  // https://docs.nestjs.com/faq/hybrid-application
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://192.162.246.63:4222'],
    },
  });
  await app.listen(3000);

  // const natsApp = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   NatsAppModule,
  //   {
  //     transport: Transport.NATS,
  //     options: {
  //       servers: ['nats://192.162.246.63:4222'],
  //     },
  //   },
  // );

  // natsApp.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );

  // await natsApp.listen();
}
bootstrap();
