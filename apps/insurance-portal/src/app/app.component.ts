import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseUrl, primeNgModules } from '@ng-journal/shared/utils';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'ng-journal-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ...primeNgModules],
  template: `
    <p-toast />

    <div class="flex flex-column h-full">
      <div
        class="surface-800 w-full h-4rem text-white font-bold text-3xl flex flex-column pl-3 justify-content-center fixed z-5"
      >
        <a
          href="https://www.ng-journal.com"
          class="text-white w-full flex align-items-center no-underline"
        >
          <img
            src="/assets/ng-journal.png"
            width="45rem"
            height="45rem"
            alt="ng-journal logo"
          />
          <span class="ml-2">Insurance Portal</span>
        </a>
      </div>
      <div class="flex flex-grow-0 pt-4rem">
        <div class="w-10rem surface-700 h-screen text-100 p-2 fixed">
          <ng-journal-sidebar />
        </div>
        <div class="surface-50 w-full pl-10rem">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .pt-4rem {
        padding-top: 4rem;
      }

      .pl-10rem {
        padding: 1rem 1rem 1rem 11rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly baseUrl = inject(BaseUrl);
}
