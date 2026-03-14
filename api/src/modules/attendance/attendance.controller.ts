import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceResponseDto } from './dto/attendance-response.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<AttendanceResponseDto> {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get(':employeeId')
  async findByEmployee(@Param('employeeId') employeeId: string): Promise<AttendanceResponseDto[]> {
    return this.attendanceService.findByEmployee(employeeId);
  }
}
