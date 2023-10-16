import { StudentDto } from '#/modules/student/dto/student.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LogRepository } from '../repositories/log.repository';
import { StudentService } from '#/modules/student/student.service';
import { SubjectService } from '#/modules/subject/subject.service';

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

@Injectable()
export class GetStatisticHandler {
  constructor(
    private logRepository: LogRepository,
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) {}

  async handle(
    personalCode: StudentDto['personalCode'],
  ): Promise<StatisticDto> {
    const student = await this.studentService.find(personalCode);
    if (!student) {
      throw new NotFoundException(
        `Student with personal code ${personalCode} not found`,
      );
    }

    const subjects = await this.subjectService.list();

    const subjectStats = await this.logRepository.getStatistic(personalCode);

    return {
      student: {
        personalCode: student.personalCode,
        name: student.name,
        lastName: student.lastName,
      },
      statistic: subjects.map(({ id, subject }) => {
        const statisticEntry = subjectStats.find(
          ({ subjectId }) => subjectId === id,
        );
        return {
          subject,
          totalGrades: statisticEntry._count.grade || 0,
          avgGrade: statisticEntry._avg.grade || undefined,
          minGrade: statisticEntry._min.grade || undefined,
          maxGrade: statisticEntry._max.grade || undefined,
        };
      }),
    };
  }
}
