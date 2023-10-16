import { StudentDto } from '#/modules/student/dto/student.dto';
import { Injectable } from '@nestjs/common';
import { LogRepository } from '../repositories/log.repository';
import { StudentService } from '#/modules/student/student.service';
import { SubjectService } from '#/modules/subject/subject.service';

export class InputLogEntryDto {
  personalCode: StudentDto['personalCode'];
  grade: number;
  subject: string;
}

@Injectable()
export class CreateLogEvent {
  constructor(
    private studentService: StudentService,
    private subjectService: SubjectService,
    private logRepository: LogRepository,
  ) {}

  async handle(data: InputLogEntryDto): Promise<void> {
    const { personalCode, subject } = data;

    const existedStudent = await this.getStudent(personalCode);

    const existedSubject = await this.getSubject(subject);

    await this.logRepository.create({
      studentId: existedStudent.id,
      subjectId: existedSubject.id,
      grade: data.grade,
    });
  }

  private async getStudent(personalCode: InputLogEntryDto['personalCode']) {
    let existedStudent = await this.studentService.find(personalCode);
    if (!existedStudent) {
      const studentData = await this.studentService.requestData(personalCode);
      existedStudent = await this.studentService.create(studentData);
    }

    return existedStudent;
  }

  private async getSubject(subject: InputLogEntryDto['subject']) {
    let existedSubject = await this.subjectService.find(subject);
    if (!existedSubject) {
      existedSubject = await this.subjectService.create(subject);
    }

    return existedSubject;
  }
}
