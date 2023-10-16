import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '#/common/prisma/prisma.service';
import { StudentService } from '#/modules/student/student.service';
import { SubjectService } from '#/modules/subject/subject.service';
import {
  InputLogEntryDto,
  LogEntryDto,
  GetStatisticParam,
  StatisticDto,
} from './dto/log.dto';

@Injectable()
export class LogService {
  constructor(
    private db: PrismaService,
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) {}

  async create(data: InputLogEntryDto) {
    const { personalCode, subject } = data;

    let existedStudent = await this.studentService.find(personalCode);
    if (!existedStudent) {
      const studentData = await this.studentService.requestData(personalCode);
      existedStudent = await this.studentService.create(studentData);
    }

    let existedSubject = await this.subjectService.find(subject);
    if (!existedSubject) {
      existedSubject = await this.subjectService.create(subject);
    }

    await this.db.log.create({
      data: {
        studentId: existedStudent.id,
        subjectId: existedSubject.id,
        grade: data.grade,
      },
    });
  }

  async list(cursor: number, limit: number): Promise<LogEntryDto[]> {
    const logEntries = await this.db.log.findMany({
      select: {
        created_at: true,
        subject: {
          select: {
            subject: true,
          },
        },
        grade: true,
        student: {
          select: {
            personalCode: true,
            name: true,
            lastName: true,
          },
        },
      },
      where: {
        id: { gt: cursor },
      },
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });

    return logEntries.map((entry) => ({
      date: entry.created_at.toISOString(),
      subject: entry.subject.subject,
      grade: entry.grade,
      student: entry.student,
    }));
  }

  async getStatistic(
    personalCode: GetStatisticParam['personalCode'],
  ): Promise<StatisticDto> {
    const student = await this.studentService.find(personalCode);
    if (!student) {
      throw new NotFoundException(
        `Student with personal code ${personalCode} not found`,
      );
    }
    const subjects = await this.subjectService.list();
    const statistic = await this.db.log.groupBy({
      by: ['subjectId'],
      _min: { grade: true },
      _max: { grade: true },
      _avg: { grade: true },
      _count: { grade: true },
      where: {
        student: {
          personalCode,
        },
      },
    });

    return {
      student: {
        personalCode: student.personalCode,
        name: student.name,
        lastName: student.lastName,
      },
      statistic: subjects.map(({ id, subject }) => {
        const statisticEntry = statistic.find(
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
