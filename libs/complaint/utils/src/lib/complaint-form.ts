import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComplaintTypeDto, Customer } from '@ng-journal/complaint/models';

export type ComplaintForm = ReturnType<typeof createComplaintForm>;

export function createComplaintForm() {
  const fb = inject(FormBuilder);
  return fb.group({
    date: fb.control(new Date(), [Validators.required]),
    customer: fb.control<Customer | null>(null, [Validators.required]),
    type: fb.control<ComplaintTypeDto | null>(null, [Validators.required]),
    description: fb.control<string | null>(null, [Validators.required]),
  });
}
