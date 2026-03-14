import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return employees.map((emp) => new EmployeeResponseDto({
      id: emp.id,
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      email: emp.email,
      department: emp.department,
      createdAt: emp.createdAt,
    }));
  }

  async create(dto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    // Check if employeeId exists
    const existingEmployeeId = await this.prisma.employee.findUnique({
      where: { employeeId: dto.employeeId },
    });

    if (existingEmployeeId) {
      throw new ConflictException(`Employee with ID ${dto.employeeId} already exists`);
    }

    // Check if email exists
    const existingEmail = await this.prisma.employee.findUnique({
      where: { email: dto.email },
    });

    if (existingEmail) {
      throw new ConflictException(`Employee with email ${dto.email} already exists`);
    }

    const employee = await this.prisma.employee.create({
      data: {
        employeeId: dto.employeeId,
        fullName: dto.fullName,
        email: dto.email,
        department: dto.department,
      },
    });

    return new EmployeeResponseDto({
      id: employee.id,
      employeeId: employee.employeeId,
      fullName: employee.fullName,
      email: employee.email,
      department: employee.department,
      createdAt: employee.createdAt,
    });
  }

  async remove(id: string): Promise<void> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    await this.prisma.employee.delete({
      where: { id },
    });
  }
}
