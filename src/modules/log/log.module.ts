import { Module } from '@nestjs/common';
import { PrismaModule } from '#/common/prisma/prisma.module';
import { StudentModule } from '#/modules/student/student.module';
import { SubjectModule } from '#/modules/subject/subject.module';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [PrismaModule, StudentModule, SubjectModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
