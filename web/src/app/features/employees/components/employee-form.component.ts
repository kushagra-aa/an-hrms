import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { CreateEmployeeDto } from '../employees.service';
import { LucideAngularModule, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent, CardComponent, LucideAngularModule],
  template: `
    <app-card class="overflow-hidden border-none shadow-none bg-muted/30">
      <div card-title class="flex items-center gap-2">
        <lucide-icon [name]="userPlusIcon" class="size-5 text-primary"></lucide-icon>
        <h3 class="text-lg font-semibold tracking-tight">Add New Employee</h3>
      </div>
      <div card-description>
        <p class="text-sm text-muted-foreground">Register a new member to the organization directory.</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mt-4 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">ID</label>
            <app-input 
              placeholder="EMP001" 
              [value]="form.value.employeeId ?? ''"
              (input)="onInputChange('employeeId', $event)"
              [class]="form.get('employeeId')?.invalid && form.get('employeeId')?.touched ? 'border-destructive bg-destructive/5' : 'bg-background'"
            ></app-input>
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Full Name</label>
            <app-input 
              placeholder="John Doe" 
              [value]="form.value.fullName ?? ''"
              (input)="onInputChange('fullName', $event)"
              [class]="form.get('fullName')?.invalid && form.get('fullName')?.touched ? 'border-destructive bg-destructive/5' : 'bg-background'"
            ></app-input>
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Email</label>
            <app-input 
              type="email" 
              placeholder="john@example.com" 
              [value]="form.value.email ?? ''"
              (input)="onInputChange('email', $event)"
              [class]="form.get('email')?.invalid && form.get('email')?.touched ? 'border-destructive bg-destructive/5' : 'bg-background'"
            ></app-input>
          </div>
          <div class="space-y-1.5">
            <label class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Department</label>
            <app-input 
              placeholder="Engineering" 
              [value]="form.value.department ?? ''"
              (input)="onInputChange('department', $event)"
              [class]="form.get('department')?.invalid && form.get('department')?.touched ? 'border-destructive bg-destructive/5' : 'bg-background'"
            ></app-input>
          </div>
        </div>

        <div class="flex justify-end pt-2 border-t border-dashed border-border/50">
          <app-button type="submit" [disabled]="form.invalid || loading" class="min-w-32 shadow-lg shadow-primary/20">
            <lucide-icon [name]="userPlusIcon" class="size-4 mr-2" *ngIf="!loading"></lucide-icon>
            {{ loading ? 'Adding...' : 'Register' }}
          </app-button>
        </div>
      </form>
    </app-card>
  `,
})
export class EmployeeFormComponent {
  @Output() add = new EventEmitter<CreateEmployeeDto>();
  @Input() loading = false;

  form: FormGroup;
  readonly userPlusIcon = UserPlus;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
    });
  }

  onInputChange(field: string, event: any) {
    this.form.get(field)?.setValue(event.target.value);
    this.form.get(field)?.markAsTouched();
  }

  onSubmit() {
    if (this.form.valid) {
      this.add.emit(this.form.value as CreateEmployeeDto);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
