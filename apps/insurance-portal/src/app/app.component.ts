import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseUrl } from '@ng-journal/shared/utils';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ng-journal-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <p class="text-2xl">app works!</p>

  <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly baseUrl = inject(BaseUrl);
}
