import { Injectable, inject, signal, computed } from '@angular/core';
import { ComplaintState } from '../state/complaint-state.model';
import { ComplaintDataService } from '../data-services/complaint-data.service';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
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
  #loaded = false;

  loadComplaint(id: string) {
    return of(null).pipe(
      switchMap(() => {
        if (this.#loaded) {
          return of(null);
        }

        return of(null).pipe(this.#loadAll());
      }),
      map(() => id),
      map((id) => this.complaints().find((c) => c.id === id)),
      filter((complaint): complaint is Complaint => !!complaint),
      tap((complaint) =>
        this.#state.update((state) => ({
          ...state,
          selectedComplaint: complaint,
        }))
      )
    );
  }

  loadComplaints() {
    return of(null).pipe(
      filter(() => !this.#loaded),
      this.#loadAll(),
      tap(() => (this.#loaded = true))
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
      id: `${Math.random()}`,
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

  #loadAll<T>(): (source$: Observable<T>) => Observable<Complaint[]> {
    return (source$) =>
      source$.pipe(
        switchMap(() =>
          this.#complaintDataService.getAll().pipe(
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
                    const complaint: Complaint = {
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
              this.#state.update((state) => ({
                ...state,
                complaints,
              }));
            })
          )
        )
      );
  }
}
