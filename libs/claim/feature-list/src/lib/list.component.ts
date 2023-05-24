import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';
import { RouterLink } from '@angular/router';
import { primeNgModules } from '@ng-journal/shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...primeNgModules],
  template: `<p-table [value]="claims()" [rowHover]="true">
    <ng-template pTemplate="header">
      <tr>
        <th>Claim number</th>
        <th>Damage Type</th>
        <th>Date</th>
        <th>Policynumber</th>
        <th>Customer</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-claim>
      <tr [routerLink]="['/', 'claim', claim.id, 'details']">
        <td>{{ claim.claimNumber }}</td>
        <td>{{ claim.damageType }}</td>
        <td>{{ claim.date | date }}</td>
        <td>{{ claim.contract.policyNumber }}</td>
        <td>{{ claim.contract.customer.name }}</td>
      </tr>
    </ng-template>
  </p-table>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #claimFacade = inject(ClaimFacadeService);
  readonly claims = this.#claimFacade.claims;
  readonly #loadClaims$ = this.#claimFacade
    .loadClaims()
    .pipe(tap(console.log))
    .pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.#loadClaims$.subscribe();
  }
}
