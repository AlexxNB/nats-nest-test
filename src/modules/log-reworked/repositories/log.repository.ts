import { Injectable } from '@nestjs/common';
import { PrismaService } from '#/common/prisma/prisma.service';
import { GetStatisticParam } from '../handlers/get-statistic.handler';

@Injectable()
export class LogRepository {
  constructor(private db: PrismaService) {}

  async create(data: { studentId: number; subjectId: number; grade: number }) {
    await this.db.log.create({
      data: {
        studentId: data.studentId,
        subjectId: data.subjectId,
        grade: data.grade,
      },
    });
  }

  async list(cursor: number, limit: number) {
    return await this.db.log.findMany({
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
  }

  async getStatistic(personalCode: GetStatisticParam['personalCode']) {
    return await this.db.log.groupBy({
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
  }
}
