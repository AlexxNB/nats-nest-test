import { Module } from '@nestjs/common';
import { PrismaModule } from '#/common/prisma/prisma.module';
import { StudentModule } from '#/modules/student/student.module';
import { SubjectModule } from '#/modules/subject/subject.module';
import { LogController } from './log.controller';
import { CreateLogEvent } from './events/create-log.event';
import { GetStatisticHandler } from './handlers/get-statistic.handler';
import { LogListHandler } from './handlers/log-list.handler';
import { LogRepository } from './repositories/log.repository';

const repositories = [LogRepository];

@Module({
  imports: [PrismaModule, StudentModule, SubjectModule],
  controllers: [LogController],
  providers: [
    CreateLogEvent,
    GetStatisticHandler,
    LogListHandler,
    ...repositories,
  ],
})
export class LogModule {}
