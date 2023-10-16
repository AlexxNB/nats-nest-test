import { StudentDto } from '#/modules/student/dto/student.dto';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { LogRepository } from '../repositories/log.repository';

export class LogEntryDto {
  @ApiProperty()
  date: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  grade: number;
  @ApiProperty()
  student: StudentDto;
}

export class ListLogEntryQuery {
  @IsInt()
  @Type(() => Number)
  cursor?: number = 0;

  @IsInt()
  @Type(() => Number)
  limit?: number = 10;
}

@Injectable()
export class LogListHandler {
  constructor(private logRepository: LogRepository) {}

  async handle(query: ListLogEntryQuery): Promise<LogEntryDto[]> {
    const logEntries = await this.logRepository.list(query.cursor, query.limit);

    return logEntries.map((entry) => ({
      date: entry.created_at.toISOString(),
      subject: entry.subject.subject,
      grade: entry.grade,
      student: entry.student,
    }));
  }
}
