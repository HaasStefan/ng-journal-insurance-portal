import { Injectable, inject, signal, computed } from '@angular/core';
import { ComplaintState } from '../state/complaint-state.model';
import { ComplaintDataService } from '../data-services/complaint-data.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { Complaint, ComplaintViewModel } from '@ng-journal/complaint/models';
import {
  CustomerDataService,
  Customer,
} from '@ng-journal/customer/api-complaint';

const initialState: Readonly<ComplaintState> = {
  complaints: [],
  selectedComplaint: null,
};

@Injectable({
  providedIn: 'root',
})
export class ComplaintFacadeService {
  readonly #complaintDataService = inject(ComplaintDataService);
  readonly #customerDataService = inject(CustomerDataService);

  readonly #state = signal(initialState);
  readonly complaints = computed(() => this.#state().complaints);
  readonly selectedComplaint = computed(() => this.#state().selectedComplaint);

  loadComplaint(id: string) {
    return this.#complaintDataService.get(id).pipe(
      filter((complaint): complaint is NonNullable<Complaint> => !!complaint),
      switchMap((complaint) =>
        this.#customerDataService.get(complaint.customer).pipe(
          filter((customer): customer is NonNullable<Customer> => !!customer),
          map((customer) => {
            const complaintViewModel: ComplaintViewModel = {
              ...complaint,
              customer: {
                id: customer.id,
                label: `${customer.firstName} ${customer.lastName}`,
              },
            };
            return complaintViewModel;
          })
        )
      ),
      tap((complaint) => {
        this.#state.set({
          ...this.#state(),
          selectedComplaint: complaint,
        });
      })
    );
  }

  loadComplaints() {
    return this.#complaintDataService.getAll().pipe(
      switchMap((complaintDtos) =>
        this.#customerDataService.getAll().pipe(
          map((customerDtos) =>
            customerDtos.map(({ id, firstName, lastName }) => ({
              id,
              label: `${firstName} ${lastName}`,
            }))
          ),
          map((customerDtos) => {
            return complaintDtos.map((dto) => {
              const complaint: ComplaintViewModel = {
                ...dto,
                customer:
                  customerDtos.find((c) => c.id === dto.customer) ?? null,
              };

              return complaint;
            });
          })
        )
      ),
      tap((complaints) => {
        this.#state.set({
          ...this.#state(),
          complaints,
        });
      })
    );
  }
}
