import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/shared/utils/cn';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      [type]="type"
      [class]="computedClass()"
      [placeholder]="placeholder"
      [value]="value"
      (input)="onInput($event)"
    />
  `,
})
export class InputComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() class = '';
  @Input() value = '';

  computedClass() {
    return cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      this.class
    );
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }
}
