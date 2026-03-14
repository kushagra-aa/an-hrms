import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardSummaryResponseDto } from './dto/dashboard-summary-response.dto';

/**
 * Controller for dashboard endpoints.
 */
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * GET /dashboard/summary
   * Returns a summary of HRMS statistics.
   */
  @Get('summary')
  async getSummary(): Promise<DashboardSummaryResponseDto> {
    return this.dashboardService.getSummary();
  }
}
