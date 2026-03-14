import { AttendanceStatus } from '@prisma/client';

/**
 * Data Transfer Object for attendance responses.
 */
export class AttendanceResponseDto {
  id: string;
  employeeId: string;
  date: string;
  status: AttendanceStatus;

  constructor(partial: Partial<AttendanceResponseDto>) {
    Object.assign(this, partial);
  }
}
