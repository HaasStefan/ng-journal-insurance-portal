import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseUrl } from '@ng-journal/shared/utils';

@Component({
  selector: 'ng-journal-root',
  standalone: true,
  imports: [CommonModule],
  template: `
  <p class="text-2xl">app works!</p>

  {{ baseUrl }}
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly baseUrl = inject(BaseUrl);
}
