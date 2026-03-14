import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, EmployeesService } from '../../employees/employees.service';
import { CreateAttendanceDto, AttendanceStatus } from '../attendance.service';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { LucideAngularModule, UserCheck, Calendar, Clock, Users, Activity, RefreshCw } from 'lucide-angular';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, CardComponent, LucideAngularModule],
  template: `
    <app-card class="bg-muted/30 border-none shadow-none overflow-hidden">
      <div card-title class="flex items-center gap-2">
        <lucide-icon [name]="userCheckIcon" class="size-5 text-primary"></lucide-icon>
        <h3 class="text-lg font-semibold tracking-tight">Log Attendance</h3>
      </div>
      <div card-description>
        <p class="text-sm text-muted-foreground">Select an employee and record their attendance status for a specific date.</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mt-4 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Employee Dropdown -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
              <lucide-icon [name]="usersIcon" class="size-3"></lucide-icon>
              Employee
            </label>
            <select 
              formControlName="employeeId"
              class="w-full h-10 px-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:bg-muted/50"
              (change)="onEmployeeChange()"
            >
              <option value="">Select Employee</option>
              @for (emp of employees; track emp.id) {
                <option [value]="emp.id">{{ emp.fullName }} ({{ emp.employeeId }})</option>
              }
            </select>
          </div>

          <!-- Date Picker -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
              <lucide-icon [name]="calendarIcon" class="size-3"></lucide-icon>
              Date
            </label>
            <input 
              type="date"
              formControlName="date"
              class="w-full h-10 px-3 rounded-md border bg-background text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all hover:bg-muted/50"
            />
          </div>

          <!-- Status Selector -->
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-1.5">
              <lucide-icon [name]="statusIcon" class="size-3"></lucide-icon>
              Status
            </label>
            <div class="flex gap-2 p-1 bg-muted/50 rounded-lg border border-dashed">
              <button 
                type="button"
                (click)="setStatus('PRESENT')"
                [class]="form.get('status')?.value === 'PRESENT' ? 'bg-green-500 text-white border-green-600 shadow-sm' : 'bg-transparent text-muted-foreground hover:bg-muted'"
                class="flex-1 h-8 rounded-md text-[10px] font-bold transition-all"
              >
                PRESENT
              </button>
              <button 
                type="button"
                (click)="setStatus('ABSENT')"
                [class]="form.get('status')?.value === 'ABSENT' ? 'bg-red-500 text-white border-red-600 shadow-sm' : 'bg-transparent text-muted-foreground hover:bg-muted'"
                class="flex-1 h-8 rounded-md text-[10px] font-bold transition-all"
              >
                ABSENT
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 border-t border-dashed border-border/50">
          <app-button type="submit" [disabled]="form.invalid || loading" class="min-w-[160px] shadow-lg shadow-primary/20">
            @if (loading) {
              <lucide-icon [name]="refreshIcon" class="size-4 mr-2 animate-spin"></lucide-icon>
              Saving...
            } @else {
              <lucide-icon [name]="clockIcon" class="size-4 mr-2"></lucide-icon>
              Submit Attendance
            }
          </app-button>
        </div>
      </form>
    </app-card>
  `,
})
export class AttendanceFormComponent implements OnInit {
  @Input() loading = false;
  @Output() submitAttendance = new EventEmitter<CreateAttendanceDto>();
  @Output() employeeSelected = new EventEmitter<string>();

  form: FormGroup;
  employees: Employee[] = [];
  
  readonly userCheckIcon = UserCheck;
  readonly calendarIcon = Calendar;
  readonly clockIcon = Clock;
  readonly usersIcon = Users;
  readonly statusIcon = Activity;
  readonly refreshIcon = RefreshCw;

  constructor(private fb: FormBuilder, private employeesService: EmployeesService) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      status: ['PRESENT', Validators.required],
    });
  }

  ngOnInit() {
    this.employeesService.getAll().subscribe(data => {
      this.employees = data;
    });
  }

  setStatus(status: AttendanceStatus) {
    this.form.get('status')?.setValue(status);
  }

  onEmployeeChange() {
    const id = this.form.get('employeeId')?.value;
    this.employeeSelected.emit(id);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitAttendance.emit(this.form.value as CreateAttendanceDto);
    }
  }
}
