import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import {
  ButtonComponent,
  CardComponent,
  HeaderComponent,
} from '@ng-journal/shared/ui';
import { ButtonActionDirective } from '@ng-journal/shared/ui-directives';
import { ContractFormComponent } from '@ng-journal/contract/ui';
import { MessageService } from 'primeng/api';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import {
  ContractStatusDto,
  Contract,
  CustomerOption,
} from '@ng-journal/contract/models';
import { primeNgModules } from '@ng-journal/shared/utils';
import { createContractForm } from '@ng-journal/contract/utils';

interface ContractStatusOption {
  label: ContractStatusDto;
  id: ContractStatusDto;
}

@Component({
  selector: 'ng-journal-edit',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardComponent,
    ButtonComponent,
    ContractFormComponent,
    ButtonActionDirective,
    ...primeNgModules,
  ],
  template: ` <ng-journal-header title="Contract Edit" />
    <ng-journal-card>
      <ng-journal-contract-form
        [form]="form"
        [customers]="customers() ?? []"
        [isEditMode]="true"
      />
    </ng-journal-card>

    <div class="p-2">
      <ng-journal-button
        label="Save"
        style="primary"
        type="submit"
        width="100%"
        [action]="action()"
        (clickEvent)="updateContract()"
        [disabled]="form.invalid || form.pristine"
      />
    </div>`,
  styles: [],
})
export class EditComponent implements OnInit {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly #messageService = inject(MessageService);
  readonly #fb = inject(FormBuilder);
  readonly #destroy = new Subject<void>();
  #id!: string;
  @Input() set id(id: string) {
    this.#destroy.next();
    this.#contractFacade
      .loadContract(id)
      .pipe(takeUntil(this.#destroy))
      .subscribe();

    this.#id = id;
  }
  readonly selectedContract = toObservable(
    this.#contractFacade.selectedContract
  ).pipe(
    filter((contract): contract is NonNullable<Contract> => !!contract),
    distinctUntilChanged()
  );
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
  readonly statusOptions = Object.values(ContractStatusDto).map(
    (status) =>
      ({
        id: status,
        label: status,
      } as ContractStatusOption)
  );
  readonly customers = toSignal(this.#customers$);
  readonly #loadCustomers$ = this.#contractFacade
    .loadCustomers()
    .pipe(takeUntilDestroyed());
  readonly form = createContractForm();
  readonly action = signal<Observable<unknown> | null>(null);

  ngOnInit() {
    this.#loadCustomers$.subscribe();

    this.selectedContract.subscribe((contract) => {
      if (
        contract.customer &&
        contract.status &&
        contract.insuranceStartOn &&
        contract.policyNumber
      ) {
        this.form.patchValue({
          insuranceStartOn: new Date(contract.insuranceStartOn),
          customer: {
            id: contract.customer.id,
            label: contract.customer.label,
          },
          policyNumber: contract.policyNumber,
          status: {
            id: contract.status,
            label: contract.status,
          },
        });
      }
    });
  }

  updateContract() {
    const { insuranceStartOn, customer, policyNumber, status } =
      this.form.getRawValue();

    if (!!insuranceStartOn && !!customer && !!policyNumber && !!status) {
      const contract: Contract = {
        insuranceStartOn,
        customer: {
          ...customer,
          phone: '',
          email: '',
        },
        id: this.#id,
        policyNumber,
        status: status.id,
      };

      this.action.set(
        this.#contractFacade.updateContract(contract).pipe(
          tap(() => this.form.markAsPristine()),
          tap(() =>
            this.#messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Contract updated successfully',
            })
          )
        )
      );
    }
  }
}
