import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, HeaderComponent } from '@ng-journal/shared/ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ng-journal-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, CardComponent],
  template: `
    <ng-journal-header title="Home" />

    <div class="flex flex-column w-full justify-content-evenly">
      <a routerLink="/complaint/list" class="no-underline text-white text-4xl">
        <ng-journal-card
          additionalClasses="surface-700 flex justify-content-center"
        >
          Contracts
        </ng-journal-card>
      </a>

      <a routerLink="/claim/list" class="no-underline text-white text-4xl">
        <ng-journal-card
          additionalClasses="surface-700 flex justify-content-center"
        >
          Claims
        </ng-journal-card>
      </a>

      <a routerLink="/complaint/list" class="no-underline text-white text-4xl">
        <ng-journal-card
          additionalClasses="surface-700 flex justify-content-center"
        >
          Complaints
        </ng-journal-card>
      </a>

      <a routerLink="/customer/list" class="no-underline text-white text-4xl">
        <ng-journal-card
          additionalClasses="surface-700 flex justify-content-center"
        >
          Customers
        </ng-journal-card>
      </a>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
