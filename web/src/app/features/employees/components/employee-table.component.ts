import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees.service';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { LucideAngularModule, Trash2, Users } from 'lucide-angular';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  template: `
    <div class="rounded-md border bg-card">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b bg-muted/50 transition-colors">
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Department</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Employee ID</th>
              <th class="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th class="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            @if (employees.length === 0) {
              <tr>
                <td colspan="5" class="p-8 text-center">
                  <div class="flex flex-col items-center justify-center space-y-2">
                    <lucide-icon [name]="usersIcon" class="size-8 text-muted-foreground opacity-20"></lucide-icon>
                    <p class="font-medium text-muted-foreground">No employees yet</p>
                    <p class="text-xs text-muted-foreground/60">Register your first employee using the form above.</p>
                  </div>
                </td>
              </tr>
            } @else {
              @for (employee of employees; track employee.id) {
                <tr class="border-b transition-colors hover:bg-muted/50">
                  <td class="p-4 align-middle font-medium">{{ employee.fullName }}</td>
                  <td class="p-4 align-middle italic text-muted-foreground">{{ employee.department }}</td>
                  <td class="p-4 align-middle font-mono text-xs">{{ employee.employeeId }}</td>
                  <td class="p-4 align-middle">{{ employee.email }}</td>
                  <td class="p-4 align-middle text-right">
                    <app-button variant="destructive" size="sm" (click)="onDelete(employee.id)" class="h-8 gap-1.5">
                      <lucide-icon [name]="trash2Icon" class="size-3.5"></lucide-icon>
                      <span>Delete</span>
                    </app-button>
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
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() delete = new EventEmitter<string>();

  readonly trash2Icon = Trash2;
  readonly usersIcon = Users;

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
