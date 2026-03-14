import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadComponent: () => import('./features/employees/employees-page.component').then(m => m.EmployeesPageComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./features/attendance/attendance-page.component').then(m => m.AttendancePageComponent)
  },
  { path: '', redirectTo: 'employees', pathMatch: 'full' }
];
