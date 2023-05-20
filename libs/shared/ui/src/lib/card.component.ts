import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-journal-card',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="p-2">
    <div
      class="p-2 shadow-2 border-round  w-full"
      [ngClass]="additionalClasses"
    >
      <ng-content></ng-content>
    </div>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() additionalClasses?: string;
}
