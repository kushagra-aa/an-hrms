import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../employees.service';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, LucideAngularModule],
  template: `
    <div class="space-y-4">
      @if (employees.length === 0) {
        <app-card class="flex flex-col items-center justify-center py-12 text-center">
          <div class="rounded-full bg-muted p-3 mb-4">
            <lucide-icon [name]="trash2Icon" class="size-6 text-muted-foreground"></lucide-icon>
          </div>
          <h3 class="text-lg font-semibold" card-title>No employees found</h3>
          <p class="text-sm text-muted-foreground" card-description>Start by adding a new employee to the system.</p>
        </app-card>
      } @else {
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (employee of employees; track employee.id) {
            <app-card>
              <h3 class="font-semibold" card-title>{{ employee.fullName }}</h3>
              <p class="text-sm text-muted-foreground" card-description>{{ employee.department }}</p>
              
              <div class="mt-4 space-y-2">
                <div class="text-xs text-muted-foreground">
                  <span class="font-medium">ID:</span> {{ employee.employeeId }}
                </div>
                <div class="text-xs text-muted-foreground">
                  <span class="font-medium">Email:</span> {{ employee.email }}
                </div>
              </div>

              <div slot="card-footer" class="w-full mt-4 flex justify-end">
                <app-button 
                  variant="destructive" 
                  size="sm" 
                  (click)="onDelete(employee.id)"
                >
                  <lucide-icon [name]="trash2Icon" class="mr-2"></lucide-icon>
                  Delete
                </app-button>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `,
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Output() delete = new EventEmitter<string>();

  readonly trash2Icon = Trash2;

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
