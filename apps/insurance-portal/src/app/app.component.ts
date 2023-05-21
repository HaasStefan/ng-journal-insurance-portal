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
        class="surface-800 w-full h-4rem text-white font-bold text-3xl flex flex-column pl-3 justify-content-center"
      >
        <span>
          <i class="mr-2 fa-sharp fa-solid fa-shield text-cyan-400"></i>
          Insurance Portal</span
        >
      </div>
      <div class="flex flex-grow-0">
        <div class="w-10rem surface-700 h-screen text-100 p-2">
          <ng-journal-sidebar />
        </div>
        <div class="p-2 surface-50 w-full">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly baseUrl = inject(BaseUrl);
}
