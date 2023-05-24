import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ContractStatusOption,
  CustomerOption,
} from '@ng-journal/contract/models';

export type ContractForm = ReturnType<typeof createContractForm>;

export function createContractForm(
  params: {
    policyNumber: string;
    insuranceStartOn: Date | null;
    customer: CustomerOption | null;
    status: ContractStatusOption | null;
  } = {
    policyNumber: '',
    insuranceStartOn: null,
    customer: null,
    status: null,
  },
  fb = inject(FormBuilder)
) {
  return fb.group({
    policyNumber: fb.control<string>(params.policyNumber, [
      Validators.required,
    ]),
    insuranceStartOn: fb.control<Date | null>(params.insuranceStartOn, [
      Validators.required,
    ]),
    customer: fb.control<CustomerOption | null>(params.customer, [
      Validators.required,
    ]),
    status: fb.control<ContractStatusOption | null>(params.status, [
      Validators.required,
    ]),
  });
}
