import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

/**
 * Controller for managing employee-related endpoints.
 */
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * POST /employees
   * Endpoint to register a new employee.
   */
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  /**
   * GET /employees
   * Endpoint to retrieve the list of all employees.
   */
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  /**
   * DELETE /employees/:id
   * Endpoint to remove an employee from the system.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
