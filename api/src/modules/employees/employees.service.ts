/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

/**
 * Service handling business logic for employee management.
 * Interacts with the database through Prisma.
 */
@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Stub for creating a new employee.
   */
  create(createEmployeeDto: CreateEmployeeDto) {
    return { message: 'Employee creation stub', data: createEmployeeDto };
  }

  /**
   * Stub for retrieving all employees.
   */
  findAll() {
    return this.prisma.employees.findMany();
  }

  /**
   * Stub for deleting an employee by ID.
   */
  remove(id: string) {
    return { message: `Delete employee stub for id ${id}` };
  }
}
