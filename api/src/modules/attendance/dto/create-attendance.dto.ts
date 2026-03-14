import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AttendanceStatus } from './../../../generated/prisma/client';

/**
 * Data Transfer Object for logging attendance record.
 */
export class CreateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDateString()
  date: string;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
