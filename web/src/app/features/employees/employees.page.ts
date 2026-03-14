import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService, Employee, CreateEmployeeDto } from './employees.service';
import { EmployeeListComponent } from './components/employee-list.component';
import { AddEmployeeFormComponent } from './components/add-employee-form.component';
import { SkeletonComponent } from '@/shared/components/skeleton/skeleton.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { LucideAngularModule, UserPlus, RefreshCw, AlertCircle } from 'lucide-angular';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-employees-page',
  standalone: true,
  imports: [
    CommonModule, 
    EmployeeListComponent, 
    AddEmployeeFormComponent, 
    SkeletonComponent, 
    CardComponent,
    ButtonComponent,
    LucideAngularModule
  ],
  template: `
    <div class="container mx-auto p-6 space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Employees</h1>
          <p class="text-muted-foreground">Manage your organization's workforce.</p>
        </div>
        <div class="flex gap-2">
          <app-button variant="outline" size="sm" (click)="loadEmployees()" [disabled]="isLoading()">
            <lucide-icon [name]="refreshIcon" [class.animate-spin]="isLoading()" class="mr-2 size-4"></lucide-icon>
            Refresh
          </app-button>
        </div>
      </div>

      <app-add-employee-form [loading]="isAdding()" (add)="onAddEmployee($event)"></app-add-employee-form>

      @if (error()) {
        <app-card class="border-destructive/50 bg-destructive/10">
          <div class="flex items-center gap-3 text-destructive">
            <lucide-icon [name]="errorIcon" class="size-5"></lucide-icon>
            <div>
              <p class="font-medium">Error loading employees</p>
              <p class="text-sm opacity-90">{{ error() }}</p>
            </div>
          </div>
          <div slot="card-footer" class="mt-4">
             <app-button variant="destructive" size="sm" (click)="loadEmployees()">Try Again</app-button>
          </div>
        </app-card>
      }

      @if (isLoading()) {
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (i of [1,2,3]; track i) {
            <app-card class="h-48">
               <app-skeleton class="h-6 w-3/4 mb-4"></app-skeleton>
               <app-skeleton class="h-4 w-1/2 mb-2"></app-skeleton>
               <app-skeleton class="h-4 w-full mb-2"></app-skeleton>
            </app-card>
          }
        </div>
      } @else if (!error()) {
        <app-employee-list 
          [employees]="employees()" 
          (delete)="onDeleteEmployee($event)"
        ></app-employee-list>
      }
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
    this.employeesService.getAll()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.employees.set(data),
        error: (err) => this.error.set('Failed to fetch employees. Please check your connection or try again later.')
      });
  }

  onAddEmployee(dto: CreateEmployeeDto) {
    this.isAdding.set(true);
    this.employeesService.create(dto)
      .pipe(finalize(() => this.isAdding.set(false)))
      .subscribe({
        next: (newEmployee) => {
          this.employees.update(current => [newEmployee, ...current]);
        },
        error: (err) => this.error.set('Failed to add employee. Please try again.')
      });
  }

  onDeleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeesService.delete(id).subscribe({
        next: () => {
          this.employees.update(current => current.filter(e => e.id !== id));
        },
        error: (err) => this.error.set('Failed to delete employee.')
      });
    }
  }
}
