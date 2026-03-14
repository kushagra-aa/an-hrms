/**
 * DTO for the dashboard summary response.
 */
export class DashboardSummaryResponseDto {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;

  constructor(partial: Partial<DashboardSummaryResponseDto>) {
    Object.assign(this, partial);
  }
}
