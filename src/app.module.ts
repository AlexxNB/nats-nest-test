import { Module } from '@nestjs/common';
import { PrismaModule } from '#/common/prisma.module';
import { NatsModule } from '#/common/nats.module';
import { LogModule } from '#/log/log.module';
import { StudentModule } from '#/student/student.module';
import { SubjectModule } from './subject/subject.module';

const moduleConfig = {
  imports: [NatsModule, PrismaModule, LogModule, StudentModule, SubjectModule],
  controllers: [],
  providers: [],
};

@Module(moduleConfig)
export class HttpAppModule {}

@Module(moduleConfig)
export class NatsAppModule {}
