import { Injectable } from '@nestjs/common';
import { PrismaService } from '#/common/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private db: PrismaService) {}

  /** Найти запись предмета */
  async find(subject: string) {
    return await this.db.subject.findFirst({
      where: { subject },
    });
  }

  /** Создать запись предмета */
  async create(subject: string) {
    return await this.db.subject.create({
      data: {
        subject,
      },
    });
  }

  /** Получить список всех предметов */
  async list() {
    return await this.db.subject.findMany();
  }
}
