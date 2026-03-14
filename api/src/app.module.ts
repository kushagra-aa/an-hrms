import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [PrismaModule, EmployeesModule, AttendanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
