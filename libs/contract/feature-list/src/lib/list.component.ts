import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { primeNgModules } from '@ng-journal/shared/utils';
import { RouterLink } from '@angular/router';
import {
  ContractStatusChipComponent,
  ContractStatusChipStylePipe,
} from '@ng-journal/contract/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ...primeNgModules,
    ContractStatusChipComponent,
    ContractStatusChipStylePipe,
  ],
  template: ` <p-table [value]="contracts()" [rowHover]="true">
    <ng-template pTemplate="header">
      <tr>
        <th>Policynumber</th>
        <th>Status</th>
        <th>Insurance Start On</th>
        <th>Customer</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Has Claims</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-contract>
      <tr [routerLink]="['/', 'contract', contract.id, 'details']">
        <td>{{ contract.policyNumber }}</td>
        <td>
          <ng-journal-contract-status-chip
            [label]="contract.status"
            [style]="contract.status | contractStatusChipStyle"
          />
        </td>
        <td>{{ contract.insuranceStartOn | date }}</td>
        <td>{{ contract.customer.label }}</td>
        <td>{{ contract.customer.phone }}</td>
        <td>{{ contract.customer.email }}</td>
        <td>{{ contract.claims.lenght > 0 }}</td>
      </tr>
    </ng-template>
  </p-table>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly contracts = this.#contractFacade.contracts;
  readonly #loadContracts$ = this.#contractFacade
    .loadContracts()
    .pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.#loadContracts$.subscribe();
  }
}
