import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { InputComponent } from '@/shared/components/input/input.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { CreateEmployeeDto } from '../employees.service';

@Component({
  selector: 'app-add-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent, CardComponent],
  template: `
    <app-card>
      <h3 class="text-lg font-semibold" card-title>Add New Employee</h3>
      <p class="text-sm text-muted-foreground" card-description>Enter the details below to register a new employee.</p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="mt-4 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Employee ID</label>
            <app-input 
              placeholder="e.g. EMP001" 
              [value]="form.value.employeeId ?? ''"
              (input)="onInputChange('employeeId', $event)"
            ></app-input>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Full Name</label>
            <app-input 
              placeholder="John Doe" 
              [value]="form.value.fullName ?? ''"
              (input)="onInputChange('fullName', $event)"
            ></app-input>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <app-input 
              type="email" 
              placeholder="john@example.com" 
              [value]="form.value.email ?? ''"
              (input)="onInputChange('email', $event)"
            ></app-input>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Department</label>
            <app-input 
              placeholder="Engineering" 
              [value]="form.value.department ?? ''"
              (input)="onInputChange('department', $event)"
            ></app-input>
          </div>
        </div>

        <div slot="card-footer" class="w-full flex justify-end pt-4">
          <app-button type="submit" [disabled]="form.invalid || loading">
            {{ loading ? 'Adding...' : 'Add Employee' }}
          </app-button>
        </div>
      </form>
    </app-card>
  `,
})
export class AddEmployeeFormComponent {
  @Output() add = new EventEmitter<CreateEmployeeDto>();
  @Input() loading = false;

  form: FormGroup;

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
  }

  onSubmit() {
    if (this.form.valid) {
      this.add.emit(this.form.value as CreateEmployeeDto);
      this.form.reset();
    }
  }
}
