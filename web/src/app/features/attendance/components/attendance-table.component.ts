import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attendance } from '../attendance.service';
import { LucideAngularModule, Calendar, CheckCircle2, XCircle } from 'lucide-angular';

@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="rounded-lg border bg-card shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b bg-muted/30 transition-colors">
              <th class="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Date of Record</th>
              <th class="h-12 px-6 text-left align-middle font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Attendance Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            @if (history.length === 0) {
              <tr>
                <td colspan="2" class="p-12 text-center">
                  <div class="flex flex-col items-center gap-2 opacity-40">
                    <lucide-icon [name]="calendarIcon" class="size-8"></lucide-icon>
                    <p class="text-sm font-medium italic">No attendance records yet</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (record of history; track record.id) {
                <tr class="transition-colors hover:bg-muted/30 group">
                  <td class="p-6 align-middle font-medium text-foreground/80">
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition-colors">
                        <lucide-icon [name]="calendarIcon" class="size-4 text-muted-foreground group-hover:text-primary transition-colors"></lucide-icon>
                      </div>
                      <div class="flex flex-col">
                        <span>{{ record.date }}</span>
                        <span class="text-[10px] text-muted-foreground font-normal italic">Daily record</span>
                      </div>
                    </div>
                  </td>
                  <td class="p-6 align-middle">
                    @if (record.status === 'PRESENT') {
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 border border-green-500/20 shadow-sm">
                        <span class="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        PRESENT
                      </span>
                    } @else {
                      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 border border-red-500/20 shadow-sm">
                        <span class="size-1.5 rounded-full bg-red-500"></span>
                        ABSENT
                      </span>
                    }
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class AttendanceTableComponent {
  @Input() history: Attendance[] = [];

  readonly calendarIcon = Calendar;
  readonly checkIcon = CheckCircle2;
  readonly xIcon = XCircle;
}
