import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DashboardSummaryResponseDto } from './dto/dashboard-summary-response.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<DashboardSummaryResponseDto> {
    const totalEmployees = await this.prisma.employee.count();

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const attendancesToday = await this.prisma.attendance.findMany({
      where: {
        date: today,
      },
    });

    const presentToday = attendancesToday.filter(a => a.status === 'PRESENT').length;
    const absentToday = attendancesToday.filter(a => a.status === 'ABSENT').length;

    return new DashboardSummaryResponseDto({
      totalEmployees,
      presentToday,
      absentToday,
    });
  }
}
