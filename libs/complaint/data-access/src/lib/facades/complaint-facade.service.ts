import { Injectable, inject, signal, computed } from '@angular/core';
import { ComplaintState } from '../state/complaint-state.model';
import { ComplaintDataService } from '../data-services/complaint-data.service';
import { map, switchMap, tap } from 'rxjs';
import {
  ComplaintDto,
  Complaint,
  Customer,
} from '@ng-journal/complaint/models';
import { CustomerDataService } from '@ng-journal/customer/api-complaint';

const initialState: Readonly<ComplaintState> = {
  complaints: [],
  customers: [],
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
  readonly customers = computed(() => this.#state().customers);
  readonly selectedComplaint = computed(() => this.#state().selectedComplaint);

  loadComplaint(id: string) {
    return this.#complaintDataService.get(id).pipe(
      switchMap((complaint) =>
        this.#customerDataService.get(complaint.customer).pipe(
          map((customer) => ({
            ...complaint,
            customer: {
              ...customer,
              label: `${customer.firstName} ${customer.lastName}`,
            },
          }))
        )
      ),
      tap((complaint) =>
        this.#state.update((state) => ({
          ...state,
          selectedComplaint: complaint,
        }))
      )
    );
  }

  loadComplaints() {
    return this.#complaintDataService.getAll().pipe(
      switchMap((complaints) =>
        this.#customerDataService
          .getAll()
          .pipe(map((customers) => ({ complaints, customers })))
      ),
      map(({ complaints, customers }) =>
        complaints.map((complaintDto) => {
          const customer = customers.find(
            (c) => c.id === complaintDto.customer
          );
          if (!customer) {
            return null;
          }

          const complaint: Complaint = {
            ...complaintDto,
            customer: {
              ...customer,
              label: `${customer.firstName} ${customer.lastName}`,
            },
          };

          return complaint;
        })
      ),
      map((complaints) =>
        complaints.filter((c): c is NonNullable<typeof c> => !!c)
      ),
      tap((complaints) =>
        this.#state.update((state) => ({ ...state, complaints }))
      )
    );
  }

  loadCustomers() {
    return this.#customerDataService.getAll().pipe(
      map((customers) =>
        customers.map((c) => {
          const customer: Customer = {
            ...c,
            label: `${c.firstName} ${c.lastName}`,
          };

          return customer;
        })
      ),
      tap((customers) =>
        this.#state.update((state) => ({ ...state, customers }))
      )
    );
  }

  createComplaint(complaint: Complaint) {
    const complaintDto: ComplaintDto = {
      ...complaint,
      id: `${Math.floor(Math.random() * 100000)}`,
      customer: complaint.customer?.id ?? '',
    };

    return this.#complaintDataService.post(complaintDto).pipe(
      tap(() => {
        this.#state.update((state) => ({
          ...state,
          complaints: [...state.complaints, complaint],
        }));
      })
    );
  }
}
