import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import {
  ButtonComponent,
  CardComponent,
  HeaderComponent,
} from '@ng-journal/shared/ui';
import {
  ContractFormComponent,
  createContractForm,
  CustomerOption,
} from '@ng-journal/contract/ui';
import { map } from 'rxjs';
import { ButtonActionDirective } from '@ng-journal/shared/ui-directives';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ContractFormComponent,
    CardComponent,
    ButtonComponent,
    ButtonActionDirective,
  ],
  template: ` <ng-journal-header title="Contract Create" />
    <ng-journal-card>
      <ng-journal-contract-form
        [form]="form"
        [customers]="(customers$ | async) ?? []"
      />
    </ng-journal-card>

    <div class="p-2">
      <ng-journal-button
        label="Save"
        style="primary"
        type="submit"
        width="100%"
        [disabled]="form.invalid"
      />
    </div>`,
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
