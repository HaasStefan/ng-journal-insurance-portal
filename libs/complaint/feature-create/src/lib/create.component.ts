import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';
import { ComplaintFormComponent } from '@ng-journal/complaint/ui';
import {
  ButtonComponent,
  CardComponent,
  HeaderComponent,
} from '@ng-journal/shared/ui';
import { ButtonActionDirective } from '@ng-journal/shared/ui-directives';
import { createComplaintForm } from '@ng-journal/complaint/utils';
import { MessageService } from 'primeng/api';
import { map, Observable, tap } from 'rxjs';
import { Complaint, Customer } from '@ng-journal/complaint/models';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [
    CommonModule,
    ComplaintFormComponent,
    HeaderComponent,
    ComplaintFormComponent,
    CardComponent,
    ButtonComponent,
    ButtonActionDirective,
  ],
  template: `
    <ng-journal-header title="Complaint Create" />
    <ng-journal-card>
      <ng-journal-complaint-form
        [form]="form"
        [customers]="customers() ?? []"
      />
    </ng-journal-card>

    <div class="p-2">
      <ng-journal-button
        label="Save"
        style="primary"
        type="submit"
        width="100%"
        [action]="action()"
        (clickEvent)="createComplaint()"
        [disabled]="form.invalid"
      />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  readonly #complaintFacade = inject(ComplaintFacadeService);
  readonly #messageService = inject(MessageService);
  readonly #customers$ = toObservable(this.#complaintFacade.customers).pipe(
    map((customers) =>
      customers.map((customer) => {
        const customerOption: Customer = {
          id: customer.id,
          label: customer.label,
        };
        return customerOption;
      })
    )
  );
  readonly customers = toSignal(this.#customers$);
  readonly #loadCustomers$ = this.#complaintFacade
    .loadCustomers()
    .pipe(takeUntilDestroyed());
  readonly form = createComplaintForm();
  readonly action = signal<Observable<unknown> | null>(null);

  ngOnInit() {
    this.#loadCustomers$.subscribe();
  }

  createComplaint() {
    const { date, type, customer, description } = this.form.getRawValue();

    if (!!date && !!type && !!customer && !!description) {
      const complaint: Complaint = {
        id: '',
        date,
        type,
        customer,
        description,
      };

      this.action.set(
        this.#complaintFacade.createComplaint(complaint).pipe(
          tap(() => this.form.reset()),
          tap(() =>
            this.#messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Complaint created successfully',
            })
          )
        )
      );
    }
  }
}
