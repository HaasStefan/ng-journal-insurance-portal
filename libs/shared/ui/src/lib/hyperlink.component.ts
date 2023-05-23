import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ng-journal-hyperlink',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<a
    [routerLink]="route"
    class="no-underline hover:underline text-900 hover:text-primary-400"
  >
    <ng-content></ng-content>
    <i class="ml-1 fa-solid fa-link"></i>
  </a>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HyperlinkComponent {
  @Input({ required: true }) route!: unknown[];
}
