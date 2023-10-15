export class StudentDto {
  personalCode: string;
  name: string;
  lastName: string;
}

export class InputStudentDto {
  data?: StudentDto;
  error: {
    message?: string;
    code: string;
  };
}
