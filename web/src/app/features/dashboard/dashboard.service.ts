import { Injectable, inject } from '@angular/core';
import { ApiService } from '@/core/api.service';
import { Observable } from 'rxjs';

export interface DashboardSummary {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private api = inject(ApiService);
  private readonly endpoint = '/dashboard/summary';

  getSummary(): Observable<DashboardSummary> {
    return this.api.get<DashboardSummary>(this.endpoint);
  }
}
