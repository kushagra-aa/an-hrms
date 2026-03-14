import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceResponseDto } from './dto/attendance-response.dto';

/**
 * Controller for managing attendance records.
 */
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * POST /attendance
   * Endpoint to log an attendance record.
   */
  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<AttendanceResponseDto> {
    return this.attendanceService.create(createAttendanceDto);
  }

  /**
   * GET /attendance/:employeeId
   * Endpoint to retrieve attendance history for a specific employee.
   */
  @Get(':employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string): Promise<AttendanceResponseDto[]> {
    return this.attendanceService.findByEmployee(employeeId);
  }
}
