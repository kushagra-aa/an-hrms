import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService, Attendance, CreateAttendanceDto } from './attendance.service';
import { AttendanceFormComponent } from './components/attendance-form.component';
import { AttendanceTableComponent } from './components/attendance-table.component';
import { LucideAngularModule, ClipboardList, AlertCircle, RefreshCw } from 'lucide-angular';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-attendance-page',
  standalone: true,
  imports: [
    CommonModule,
    AttendanceFormComponent,
    AttendanceTableComponent,
    LucideAngularModule
  ],
  template: `
    <div class="container mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 class="text-3xl font-bold tracking-tight flex items-center gap-3">
          <lucide-icon [name]="listIcon" class="size-8 text-primary/80"></lucide-icon>
          Attendance tracking
        </h1>
        <p class="text-muted-foreground">Monitor and record daily workforce attendance.</p>
      </div>

      <app-attendance-form 
        [loading]="isSaving()" 
        (employeeSelected)="onEmployeeSelected($event)"
        (submitAttendance)="onSubmitAttendance($event)"
      ></app-attendance-form>

      @if (error()) {
        <div class="rounded-md border border-destructive/50 bg-destructive/10 p-4 animate-in slide-in-from-top-2">
          <div class="flex items-center gap-3 text-destructive">
            <lucide-icon [name]="errorIcon" class="size-5"></lucide-icon>
            <div>
              <p class="font-medium">Attendance Error</p>
              <p class="text-xs opacity-80 mt-0.5">{{ error() }}</p>
            </div>
          </div>
        </div>
      }

      <div class="space-y-6">
        <div class="flex items-center justify-between border-b pb-2">
          <h2 class="text-xl font-semibold tracking-tight">Attendance History</h2>
          @if (selectedEmployeeId()) {
            <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Viewing Record</span>
          }
        </div>

        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center py-12 space-y-4">
             <div class="relative">
               <lucide-icon [name]="refreshIcon" class="size-10 text-primary animate-spin opacity-20"></lucide-icon>
               <lucide-icon [name]="refreshIcon" class="size-10 text-primary absolute inset-0 animate-pulse"></lucide-icon>
             </div>
             <p class="text-sm font-medium animate-pulse text-muted-foreground">Loading attendance records...</p>
          </div>
        } @else if (selectedEmployeeId()) {
          <app-attendance-table [history]="history()"></app-attendance-table>
        } @else {
          <div class="rounded-md border border-dashed p-12 text-center">
            <lucide-icon [name]="listIcon" class="size-12 text-muted-foreground/20 mx-auto mb-4"></lucide-icon>
            <p class="text-sm text-muted-foreground">Select an employee above to view their attendance history.</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class AttendancePageComponent {
  private attendanceService = inject(AttendanceService);

  selectedEmployeeId = signal<string | null>(null);
  history = signal<Attendance[]>([]);
  isLoading = signal(false);
  isSaving = signal(false);
  error = signal<string | null>(null);

  readonly listIcon = ClipboardList;
  readonly errorIcon = AlertCircle;
  readonly refreshIcon = RefreshCw;

  onEmployeeSelected(employeeId: string) {
    this.selectedEmployeeId.set(employeeId || null);
    if (employeeId) {
      this.loadHistory(employeeId);
    } else {
      this.history.set([]);
    }
  }

  loadHistory(employeeId: string) {
    this.isLoading.set(true);
    this.error.set(null);
    this.attendanceService.getByEmployeeId(employeeId)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (data) => this.history.set(data),
        error: (err) => {
          console.error('Error fetching history:', err);
          this.error.set('Failed to load attendance history.');
        }
      });
  }

  onSubmitAttendance(dto: CreateAttendanceDto) {
    this.isSaving.set(true);
    this.error.set(null);
    this.attendanceService.create(dto)
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: (record) => {
          // If the record is for the currently selected employee, prepend it
          if (this.selectedEmployeeId() === dto.employeeId) {
            this.history.update(current => [record, ...current]);
          }
        },
        error: (err) => {
          console.error('Error saving attendance:', err);
          if (err.status === 409) {
            this.error.set('An attendance record already exists for this employee on this date.');
          } else {
            this.error.set('Failed to save attendance record. Please try again.');
          }
        }
      });
  }
}
