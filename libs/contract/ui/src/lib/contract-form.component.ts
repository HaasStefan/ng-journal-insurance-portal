import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { primeNgModules } from '@ng-journal/shared/utils';
import {
  ContractStatusChipComponent,
  ContractStatusChipStyle,
} from './contract-status-chip.component';
import { ContractStatus, CustomerOption } from '@ng-journal/contract/models';
import { ContractForm } from '@ng-journal/contract/utils';

@Component({
  selector: 'ng-journal-contract-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContractStatusChipComponent,
    ...primeNgModules,
  ],
  template: ` <form [formGroup]="form" class="grid">
    <div class="col-6 flex flex-column gap-2">
      <ng-container *ngIf="isEditMode; else createMode">
        <label htmlFor="status">Status</label>
        <p-dropdown
          name="status"
          [options]="statusOptions"
          formControlName="status"
          placeholder="Select status"
          [style]="{ width: '100%' }"
        />
        <span
          *ngIf="!!form.controls.status.errors?.['required'] && form.controls.status.dirty"
          class="text-red-700"
        >
          Input is required.
        </span>
      </ng-container>
    </div>
    <ng-template #createMode>
      <label htmlFor="status">Status</label>
      <ng-journal-contract-status-chip
        label="Pending"
        [style]="pendingStatus"
      />
    </ng-template>

    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="customer">Customer</label>
      <p-dropdown
        name="customer"
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
  #isEditMode!: boolean;
  @Input({ required: true }) set isEditMode(value: boolean) {
    this.#isEditMode = value;
    if (!value) {
      this.form.controls.status.disable();
      this.form.controls.status.setValue({
        id: ContractStatus.Pending,
        label: ContractStatus.Pending,
      });
    }
  }
  get isEditMode() {
    return this.#isEditMode;
  }
  readonly statusOptions = Object.values(ContractStatus).map((status) => ({
    id: status,
    label: status,
  }));
  readonly pendingStatus = ContractStatusChipStyle.Pending;
}
