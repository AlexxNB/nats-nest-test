import { Module } from '@nestjs/common';
import { NatsModule } from '#/common/nats/nats.module';
import { PrismaModule } from '#/common/prisma/prisma.module';
import { StudentService } from './student.service';

@Module({
  imports: [NatsModule, PrismaModule],
  controllers: [],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
