import { Injectable, inject } from '@angular/core';
import { ApiService } from '@/core/api.service';
import { Observable } from 'rxjs';

export type AttendanceStatus = 'PRESENT' | 'ABSENT';

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  status: AttendanceStatus;
}

export interface CreateAttendanceDto {
  employeeId: string;
  date: string;
  status: AttendanceStatus;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private api = inject(ApiService);

  create(dto: CreateAttendanceDto): Observable<Attendance> {
    return this.api.post<Attendance>('/attendance', dto);
  }

  getByEmployeeId(employeeId: string): Observable<Attendance[]> {
    return this.api.get<Attendance[]>(`/attendance/${employeeId}`);
  }
}
