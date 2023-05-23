import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
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
  ContractStatusChipComponent,
  createContractForm,
  CustomerOption,
} from '@ng-journal/contract/ui';
import { map, Observable, tap } from 'rxjs';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { ButtonActionDirective } from '@ng-journal/shared/ui-directives';
import { ContractStatus, ContractViewModel } from '@ng-journal/contract/models';
import { MessageService } from 'primeng/api';

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
    ContractStatusChipComponent,
  ],
  template: ` <ng-journal-header title="Contract Create" />
    <ng-journal-card>
      <ng-journal-contract-form
        [form]="form"
        [customers]="customers() ?? []"
        [isEditMode]="false"
      />
    </ng-journal-card>

    <div class="p-2">
      <ng-journal-button
        label="Save"
        style="primary"
        type="submit"
        width="100%"
        [action]="action()"
        (clickEvent)="createContract()"
        [disabled]="form.invalid"
      />
    </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly #messageService = inject(MessageService);
  readonly #customers$ = toObservable(this.#contractFacade.customers).pipe(
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
  readonly customers = toSignal(this.#customers$);
  readonly #loadCustomers$ = this.#contractFacade
    .loadCustomers()
    .pipe(takeUntilDestroyed());
  readonly form = createContractForm();
  readonly action = signal<Observable<unknown> | null>(null);

  ngOnInit() {
    this.#loadCustomers$.subscribe();
  }

  createContract() {
    const { insuranceStartOn, customer, policyNumber } =
      this.form.getRawValue();

    if (!!insuranceStartOn && !!customer && !!policyNumber) {
      const contract: ContractViewModel = {
        insuranceStartOn,
        customer: {
          ...customer,
          phone: '',
          email: '',
        },
        claims: [],
        id: '',
        policyNumber,
        status: ContractStatus.Pending,
      };

      this.action.set(
        this.#contractFacade.createContract(contract).pipe(
          tap(() => this.form.reset()),
          tap(() =>
            this.#messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Contract created successfully',
            })
          )
        )
      );
    }
  }
}
