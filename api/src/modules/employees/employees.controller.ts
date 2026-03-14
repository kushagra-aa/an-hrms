import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeesService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeesService.remove(id);
  }
}
