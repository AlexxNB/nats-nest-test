import { Injectable } from '@nestjs/common';
import { StudentDto, InputStudentDto } from './dto/student.dto';
import { PrismaService } from '#/common/prisma/prisma.service';
import { NatsService } from '#/common/nats/nats.service';

@Injectable()
export class StudentService {
  constructor(
    private db: PrismaService,
    private nats: NatsService,
  ) {}

  /** Получить студента */
  async find(personalCode: StudentDto['personalCode']) {
    return this.db.student.findFirst({
      where: {
        personalCode,
      },
    });
  }

  /** Создать студента */
  async create(studentData: StudentDto) {
    return this.db.student.create({
      data: studentData,
    });
  }

  /** Запросить информацию о студенте из внешнего сервиса */
  async requestData(personalCode: StudentDto['personalCode']) {
    const result = await this.nats.request<InputStudentDto>('students.v1.get', {
      personalCode,
    });

    return result.error ? null : result.data;
  }
}
