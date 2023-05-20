import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { primeNgModules } from '@ng-journal/shared/utils';

export type ContractForm = ReturnType<typeof createContractForm>;

export function createContractForm(
  formBuilder?: FormBuilder,
  abstractControls: Record<string, AbstractControl> = {}
) {
  const fb = formBuilder ?? inject(FormBuilder);

  return fb.group({
    policyNumber: fb.control<string>('', [Validators.required]),
    insuranceStartOn: fb.control<Date | null>(null, [Validators.required]),
    customer: fb.control<CustomerOption | null>(null, [Validators.required]),
    ...abstractControls,
  });
}

export type CustomerOption = {
  id: string;
  label: string;
};

@Component({
  selector: 'ng-journal-contract-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primeNgModules],
  template: ` <form [formGroup]="form" class="grid">
    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="status">Status</label>
      <span id="status" class="font-bold"> Pending </span>
    </div>

    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="customer">Customer</label>
      <p-dropdown
        id="customer"
        [options]="customers"
        formControlName="customer"
        placeholder="Select customer"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.customer.errors?.['required'] && form.controls.customer.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>

    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="policyNumber">Policynumber</label>
      <input
        pInputText
        type="text"
        id="policyNumber"
        formControlName="policyNumber"
      />
      <span
        *ngIf="!!form.controls.policyNumber.errors?.['required'] && form.controls.policyNumber.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>

    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="insuranceStartOn">Insurance Start On</label>
      <p-calendar
        id="insuranceStartOn"
        formControlName="insuranceStartOn"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.insuranceStartOn.errors?.['required'] && form.controls.insuranceStartOn.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
  </form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractFormComponent {
  @Input({ required: true }) form!: ContractForm;
  @Input({ required: true }) customers!: CustomerOption[];
}
