import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFacadeService } from '@ng-journal/customer/data-access';
import { primeNgModules } from '@ng-journal/shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@ng-journal/shared/ui';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, ...primeNgModules],
  template: ` <ng-journal-header title="Customers" />
    <p-table [value]="customers()" [rowHover]="true">
      <ng-template pTemplate="header">
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-customer>
        <tr [routerLink]="['/', 'customer', customer.id, 'details']">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.address.street }}</td>
          <td>{{ customer.address.city }}</td>
          <td>{{ customer.address.state }}</td>
          <td>{{ customer.address.zip }}</td>
        </tr>
      </ng-template>
    </p-table>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #customerFacade = inject(CustomerFacadeService);
  readonly customers = this.#customerFacade.customers;
  readonly loadCustomers = this.#customerFacade
    .loadCustomers()
    .pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.loadCustomers.subscribe();
  }
}
