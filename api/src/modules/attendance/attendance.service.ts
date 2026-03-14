import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceResponseDto } from './dto/attendance-response.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<AttendanceResponseDto> {
    const { employeeId, date, status } = createAttendanceDto;

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const attendanceDate = new Date(date);
    attendanceDate.setUTCHours(0, 0, 0, 0);

    const existing = await this.prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: attendanceDate,
        },
      },
    });

    if (existing) {
      throw new ConflictException(
        `Attendance record already exists for this employee on ${date}`,
      );
    }

    const attendance = await this.prisma.attendance.create({
      data: {
        employeeId,
        date: attendanceDate,
        status,
      },
    });

    return new AttendanceResponseDto({
      id: attendance.id,
      employeeId: attendance.employeeId,
      date: attendance.date.toISOString().split('T')[0],
      status: attendance.status,
    });
  }

  async findByEmployee(employeeId: string): Promise<AttendanceResponseDto[]> {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    const attendanceRecords = await this.prisma.attendance.findMany({
      where: { employeeId },
      orderBy: { date: 'desc' },
    });

    return attendanceRecords.map(
      (record) =>
        new AttendanceResponseDto({
          id: record.id,
          employeeId: record.employeeId,
          date: record.date.toISOString().split('T')[0],
          status: record.status,
        }),
    );
  }
}
