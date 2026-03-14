import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '@/shared/utils/cn';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="computedClass()">
      <div class="flex flex-col space-y-1.5 p-6">
        <ng-content select="[card-title]"></ng-content>
        <ng-content select="[card-description]"></ng-content>
      </div>
      <div class="p-6 pt-0">
        <ng-content></ng-content>
      </div>
      <div class="flex items-center p-6 pt-0">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() class = '';

  computedClass() {
    return cn('rounded-xl border bg-card text-card-foreground shadow', this.class);
  }
}
