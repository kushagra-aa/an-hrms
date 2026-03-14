import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService, Employee, CreateEmployeeDto } from './employees.service';
import { EmployeeTableComponent } from './components/employee-table.component';
import { EmployeeFormComponent } from './components/employee-form.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { LucideAngularModule, RefreshCw, AlertCircle } from 'lucide-angular';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeTableComponent,
    EmployeeFormComponent,
    ButtonComponent,
    LucideAngularModule,
  ],
  template: `
    <div class="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Employees</h1>
          <p class="text-muted-foreground">Manage your organization's workforce effortlessly.</p>
        </div>
        <div class="flex gap-2">
          <app-button
            variant="outline"
            size="sm"
            (click)="loadEmployees()"
            [disabled]="isLoading()"
          >
            <lucide-icon
              [name]="refreshIcon"
              [class.animate-spin]="isLoading()"
              class="mr-2 size-4"
            ></lucide-icon>
            Refresh
          </app-button>
        </div>
      </div>

      <app-employee-form [loading]="isAdding()" (add)="onAddEmployee($event)"></app-employee-form>

      @if (error()) {
        <div
          class="rounded-md border border-destructive/50 bg-destructive/10 p-4 animate-in slide-in-from-top-2 duration-300"
        >
          <div class="flex items-center gap-3 text-destructive">
            <lucide-icon [name]="errorIcon" class="size-5"></lucide-icon>
            <div>
              <p class="font-medium">Failed to load employees</p>
              <p class="text-xs opacity-80 mt-0.5">{{ error() }}</p>
            </div>
          </div>
          <app-button variant="destructive" size="sm" class="mt-4" (click)="loadEmployees()"
            >Try Again</app-button
          >
        </div>
      }

      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h2 class="text-xl font-semibold tracking-tight">Employee Directory</h2>
          <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
            >{{ employees().length }} Total</span
          >
        </div>

        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="relative">
              <lucide-icon
                [name]="refreshIcon"
                class="size-10 text-primary animate-spin opacity-20"
              ></lucide-icon>
              <lucide-icon
                [name]="refreshIcon"
                class="size-10 text-primary absolute inset-0 animate-pulse"
              ></lucide-icon>
            </div>
            <p class="text-sm font-medium animate-pulse text-muted-foreground">
              Loading employees...
            </p>
          </div>
        } @else if (!error()) {
          <app-employee-table
            [employees]="employees()"
            (delete)="onDeleteEmployee($event)"
          ></app-employee-table>
        }
      </div>
    </div>
  `,
})
export class EmployeesPageComponent implements OnInit {
  private employeesService = inject(EmployeesService);

  employees = signal<Employee[]>([]);
  isLoading = signal(false);
  isAdding = signal(false);
  error = signal<string | null>(null);

  readonly refreshIcon = RefreshCw;
  readonly errorIcon = AlertCircle;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isLoading.set(true);
    this.error.set(null);
    this.employeesService
      .getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.employees.set(data),
        error: (err) => {
          console.error('Error fetching employees:', err);
          this.error.set('Could not fetch employee data. Please verify the API is running.');
        },
      });
  }

  onAddEmployee(dto: CreateEmployeeDto) {
    this.isAdding.set(true);
    this.employeesService
      .create(dto)
      .pipe(finalize(() => this.isAdding.set(false)))
      .subscribe({
        next: (newEmployee) => {
          this.employees.update((current) => [newEmployee, ...current]);
        },
        error: (err) => {
          console.error('Error adding employee:', err);
          this.error.set('Failed to add employee. Email or Employee ID might already be taken.');
        },
      });
  }

  onDeleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeesService.delete(id).subscribe({
        next: () => {
          this.employees.update((current) => current.filter((e) => e.id !== id));
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.error.set('Failed to delete employee. Please try again.');
        },
      });
    }
  }
}
