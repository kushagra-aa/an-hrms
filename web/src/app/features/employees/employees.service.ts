import { Injectable, inject } from '@angular/core';
import { ApiService } from '@/core/api.service';
import { Observable } from 'rxjs';

export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: string;
}

export interface CreateEmployeeDto {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private api = inject(ApiService);
  private readonly endpoint = '/employees';

  getAll(): Observable<Employee[]> {
    return this.api.get<Employee[]>(this.endpoint);
  }

  create(employee: CreateEmployeeDto): Observable<Employee> {
    return this.api.post<Employee>(this.endpoint, employee);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
