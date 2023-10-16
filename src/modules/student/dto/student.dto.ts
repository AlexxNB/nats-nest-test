import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty()
  personalCode: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  lastName: string;
}

export class InputStudentDto {
  data?: StudentDto;
  error: {
    message?: string;
    code: string;
  };
}
