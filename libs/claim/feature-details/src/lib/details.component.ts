import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';
import {
  CardComponent,
  HeaderComponent,
  HyperlinkComponent,
} from '@ng-journal/shared/ui';
import { primeNgModules } from '@ng-journal/shared/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardComponent,
    HyperlinkComponent,
    ...primeNgModules,
  ],
  template: ` <ng-journal-header title="Claim Details" />
    <ng-container *ngIf="claim() as claim">
      <ng-journal-card additionalClasses="grid">
        <div class="col-2 font-bold">Claim Number:</div>
        <div class="col-4">
          {{ claim.claimNumber }}
        </div>
        <div class="col-2 font-bold">Date:</div>
        <div class="col-4">
          {{ claim.date | date }}
        </div>
        <div class="col-2 font-bold">Damage Type:</div>
        <div class="col-4">
          {{ claim.damageType }}
        </div>

        <div class="col-6"></div>

        <div class="col-2 font-bold">Policynumber:</div>
        <div class="col-4">
          {{ claim.contract.policyNumber }}
        </div>

        <div class="col-2 font-bold">Customer:</div>
        <div class="col-4">
          <ng-journal-hyperlink
            [route]="['/customer', claim.contract.customer.id, 'details']"
          >
            {{ claim.contract.customer.name }}
          </ng-journal-hyperlink>
        </div>
      </ng-journal-card>
    </ng-container>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnDestroy {
  readonly #claimFacade = inject(ClaimFacadeService);
  readonly claim = this.#claimFacade.selectedClaim;
  readonly #destroy = new Subject<void>();
  @Input() set id(id: string) {
    this.#destroy.next();
    this.#claimFacade.loadClaim(id).pipe(takeUntil(this.#destroy)).subscribe();
  }

  ngOnDestroy(): void {
    this.#destroy.next();
    this.#destroy.complete();
  }
}
