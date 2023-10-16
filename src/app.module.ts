import { Module } from '@nestjs/common';
import { PrismaModule } from '#/common/prisma/prisma.module';
import { NatsModule } from '#/common/nats/nats.module';
import { LogModule } from '#/modules/log/log.module';
import { StudentModule } from '#/modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';

const moduleConfig = {
  imports: [NatsModule, PrismaModule, LogModule, StudentModule, SubjectModule],
  controllers: [],
  providers: [],
};

@Module(moduleConfig)
export class AppModule {}

// @Module(moduleConfig)
// export class NatsAppModule {}
