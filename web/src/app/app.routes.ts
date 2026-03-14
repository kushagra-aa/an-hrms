import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./features/employees/employees-page.component').then(m => m.EmployeesPageComponent)
  },
  {
    path: 'attendance',
    loadComponent: () => import('./features/attendance/attendance-page.component').then(m => m.AttendancePageComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
