export class EmployeeResponseDto {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: Date;

  constructor(partial: Partial<EmployeeResponseDto>) {
    Object.assign(this, partial);
  }
}
