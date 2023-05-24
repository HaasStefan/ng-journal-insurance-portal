import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintForm } from '@ng-journal/complaint/utils';
import { primeNgModules } from '@ng-journal/shared/utils';
import { ReactiveFormsModule } from '@angular/forms';
import { ComplaintType, Customer } from '@ng-journal/complaint/models';

@Component({
  selector: 'ng-journal-complaint-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...primeNgModules],
  template: ` <form [formGroup]="form" class="grid">
    <div class="col-4 flex flex-column gap-2">
      <label htmlFor="type">Type</label>
      <p-dropdown
        name="type"
        [options]="typeOptions"
        formControlName="type"
        placeholder="Select type"
        [style]="{ width: '100%' }"
      />
      <span
        *ngIf="!!form.controls.type.errors?.['required'] && form.controls.type.dirty"
        class="text-red-700"
      >
        Input is required.
      </span>
    </div>
    <div class="col-4 flex flex-column gap-2">
      <label htmlFor="customer">Customer</label>
      <p-dropdown
        name="customer"
        [options]="customers"
        formControlName="customers"
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
    <div class="col-4 flex flex-column gap-2">
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
export class ComplaintFormComponent {
  @Input({ required: true }) form!: ComplaintForm;
  @Input({ required: true }) customers!: Customer[];
  readonly typeOptions = Object.values(ComplaintType);
}
