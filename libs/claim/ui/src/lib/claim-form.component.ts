import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNgModules } from '@ng-journal/shared/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { ClaimForm } from '@ng-journal/claim/utils';
import {
  ContractOption,
  DamageTypeOption,
  damageTypes,
} from '@ng-journal/claim/models';

@Component({
  selector: 'ng-journal-claim-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primeNgModules],
  template: `<form [formGroup]="form" class="grid">
    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="claimNumber">Claim Number</label>
      <input
        pInputText
        type="text"
        id="claimNumber"
        formControlName="claimNumber"
      />
      <span
        *ngIf="!!form.controls.claimNumber.errors?.['required'] && form.controls.claimNumber.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="date">Date</label>
      <p-calendar
        id="date"
        formControlName="date"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.date.errors?.['required'] && form.controls.date.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="damageType">Damage Type</label>
      <p-dropdown
        name="damageType"
        [options]="damageTypeOptions"
        formControlName="damageType"
        placeholder="Select damage type"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.damageType.errors?.['required'] && form.controls.damageType.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
    <div class="col-6 flex flex-column gap-2">
      <label htmlFor="contract">Policynumber</label>
      <p-dropdown
        name="contract"
        [options]="contracts"
        optionLabel="policyNumber"
        formControlName="contract"
        placeholder="Select contract"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.contract.errors?.['required'] && form.controls.contract.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
    <div class="col-12 flex flex-column gap-2">
      <label htmlFor="description">Description</label>
      <textarea
        pInputTextarea
        [autoResize]="true"
        rows="5"
        id="description"
        formControlName="description"
      ></textarea>
      <span
        *ngIf="!!form.controls.description.errors?.['required'] && form.controls.description.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
  </form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimFormComponent {
  @Input({ required: true }) form!: ClaimForm;
  @Input({ required: true }) contracts!: ContractOption[];
  readonly damageTypeOptions = damageTypes.map(
    (type) =>
      ({
        label: type,
        id: type,
      } as DamageTypeOption)
  );
}
