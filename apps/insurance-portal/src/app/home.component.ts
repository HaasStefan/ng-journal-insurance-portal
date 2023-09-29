import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, HeaderComponent } from '@ng-journal/shared/ui';
import { RouterLink } from '@angular/router';
import { FeatureFlagDirective } from '@ng-journal/shared/data-access';

@Component({
  selector: 'ng-journal-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    CardComponent,
    FeatureFlagDirective,
  ],
  template: `
    <ng-journal-header title="Home" />

    <div class="flex flex-column w-full justify-content-evenly">
      <ng-container *ngJournalFeatureFlag="'contract-list'">
        <a routerLink="/contract/list" class="no-underline text-white text-4xl">
          <ng-journal-card
            additionalClasses="surface-700 flex justify-content-center"
          >
            Contracts
          </ng-journal-card>
        </a>
      </ng-container>

      <ng-container *ngJournalFeatureFlag="'claim-list'">
        <a routerLink="/claim/list" class="no-underline text-white text-4xl">
          <ng-journal-card
            additionalClasses="surface-700 flex justify-content-center"
          >
            Claims
          </ng-journal-card>
        </a>
      </ng-container>

      <ng-container *ngJournalFeatureFlag="'complaint-list'">
        <a
          routerLink="/complaint/list"
          class="no-underline text-white text-4xl"
        >
          <ng-journal-card
            additionalClasses="surface-700 flex justify-content-center"
          >
            Complaints
          </ng-journal-card>
        </a>
      </ng-container>

      <ng-container *ngJournalFeatureFlag="'customer-list'">
        <a routerLink="/customer/list" class="no-underline text-white text-4xl">
          <ng-journal-card
            additionalClasses="surface-700 flex justify-content-center"
          >
            Customers
          </ng-journal-card>
        </a>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
