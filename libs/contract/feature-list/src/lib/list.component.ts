import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { primeNgModules } from '@ng-journal/shared/utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...primeNgModules],
  template: ` <p-table [value]="(contracts$ | async) ?? []">
    <ng-template pTemplate="header">
      <tr>
        <th>Policynumber</th>
        <th>Insurance Start On</th>
        <th>Customer</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Has Claims</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-contract>
      <tr [routerLink]="['/', 'contract', contract.id]">
        <td>{{ contract.policyNumber }}</td>
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
export class ListComponent {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly contracts$ = this.#contractFacade.contracts$;
}
