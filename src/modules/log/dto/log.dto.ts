import { StudentDto } from '#/modules/student/dto/student.dto';
import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LogEntryDto {
  date: string;
  subject: string;
  grade: number;
  student: StudentDto;
}

export class InputLogEntryDto {
  personalCode: StudentDto['personalCode'];
  grade: number;
  subject: string;
}

export class ListLogEntryQuery {
  @IsInt()
  @Type(() => Number)
  cursor?: number = 0;

  @IsInt()
  @Type(() => Number)
  limit?: number = 10;
}

export class GetStatisticParam {
  @IsString()
  personalCode: StudentDto['personalCode'];
}

export class StatisticDto {
  @ApiProperty({ type: StudentDto })
  student: StudentDto;
  // api property...
  statistic: {
    subject: string;
    maxGrade?: number;
    minGrade?: number;
    avgGrade?: number;
    totalGrades: number;
  }[];
}
