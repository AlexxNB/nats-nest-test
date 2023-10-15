import { Module } from '@nestjs/common';
import { PrismaModule } from '#/common/prisma.module';
import { StudentModule } from '#/student/student.module';
import { SubjectModule } from '#/subject/subject.module';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [PrismaModule, StudentModule, SubjectModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
