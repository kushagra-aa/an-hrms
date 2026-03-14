import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/shared/utils/cn';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass()"></div>
  `,
})
export class SkeletonComponent {
  @Input() class = '';

  computedClass() {
    return cn('animate-pulse rounded-md bg-primary/10', this.class);
  }
}
