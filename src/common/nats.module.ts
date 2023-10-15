import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RequestSerializer } from './lib/natsSerializer';
import { NatsService } from '#/common/nats.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://192.162.246.63:4222'],
          serializer: new RequestSerializer(),
        },
      },
    ]),
  ],
  providers: [NatsService],
  exports: [NatsService],
})
export class NatsModule {}
