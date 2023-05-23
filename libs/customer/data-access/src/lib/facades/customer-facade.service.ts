import { Injectable, inject, signal, computed } from '@angular/core';
import { CustomerState } from '../state/customer-state.model';
import { CustomerDataService } from '../data-services/customer-data.service';
import { tap } from 'rxjs';

const initialState: Readonly<CustomerState> = {
  customers: [],
  selectedCustomer: null,
};

@Injectable({
  providedIn: 'root',
})
export class CustomerFacadeService {
  readonly #customerDataService = inject(CustomerDataService);

  readonly #state = signal(initialState);
  readonly customers = computed(() => this.#state().customers);
  readonly selectedCustomer = computed(() => this.#state().selectedCustomer);

  loadCustomer(id: string) {
    return this.#customerDataService.get(id).pipe(
      tap((customer) =>
        this.#state.set({
          ...this.#state(),
          selectedCustomer: customer,
        })
      )
    );
  }

  loadCustomers() {
    return this.#customerDataService.getAll().pipe(
      tap((customers) =>
        this.#state.set({
          ...this.#state(),
          customers,
        })
      )
    );
  }
}
