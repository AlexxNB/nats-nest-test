import { Module } from '@nestjs/common';
import { NatsModule } from '#/common/nats.module';
import { PrismaModule } from '#/common/prisma.module';
import { StudentService } from './student.service';

@Module({
  imports: [NatsModule, PrismaModule],
  controllers: [],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
