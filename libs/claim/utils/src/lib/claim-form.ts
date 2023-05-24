import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContractOption, DamageTypeOption } from '@ng-journal/claim/models';

export type ClaimForm = ReturnType<typeof createClaimForm>;

export function createClaimForm() {
  const fb = inject(FormBuilder);
  return fb.group({
    claimNumber: fb.control<string | null>(null, [Validators.required]),
    date: fb.control(new Date(), [Validators.required]),
    damageType: fb.control<DamageTypeOption | null>(null, [
      Validators.required,
    ]),
    contract: fb.control<ContractOption | null>(null, [Validators.required]),
    description: fb.control<string | null>(null, [Validators.required]),
  });
}
