import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { CardComponent, HeaderComponent } from '@ng-journal/shared/ui';
import {
  ContractFormComponent,
  createContractForm,
  CustomerOption,
} from '@ng-journal/contract/ui';
import { map } from 'rxjs';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ContractFormComponent,
    CardComponent,
  ],
  template: ` <ng-journal-header title="Contract Create" />
    <ng-journal-card>
      <ng-journal-contract-form
        [form]="form"
        [customers]="(customers$ | async) ?? []"
      />
    </ng-journal-card>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly customers$ = this.#contractFacade.customers$.pipe(
    map((customers) =>
      customers.map((customer) => {
        const customerOption: CustomerOption = {
          id: customer.id,
          label: customer.label,
        };
        return customerOption;
      })
    )
  );
  readonly form = createContractForm();

  ngOnInit() {
    this.#contractFacade.loadAllCustomers();
  }
}
