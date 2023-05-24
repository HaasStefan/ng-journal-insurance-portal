import { Injectable, inject, signal, computed } from '@angular/core';
import { ContractState } from '../state/contract-state.model';
import { ContractDataService } from '../data-services/contract-data.service';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { CustomerDataService } from '@ng-journal/customer/api-contract';
import { ContractDto, Contract, Customer } from '@ng-journal/contract/models';

const initialState: Readonly<ContractState> = {
  selectedContract: null,
  contracts: [],
  customers: [],
};

@Injectable({
  providedIn: 'root',
})
export class ContractFacadeService {
  readonly #contractDataService = inject(ContractDataService);
  readonly #customerDataService = inject(CustomerDataService);

  readonly #state = signal(initialState);
  readonly contracts = computed(() => this.#state().contracts);
  readonly customers = computed(() => this.#state().customers);
  readonly selectedContract = computed(() => this.#state().selectedContract);
  #loaded = false;

  loadContracts() {
    return of(null).pipe(
      filter(() => !this.#loaded),
      this.#loadAll(),
      tap(() => (this.#loaded = true))
    );
  }

  loadContract(id: string) {
    return of(null).pipe(
      switchMap(() => {
        if (this.#loaded) {
          return of(null);
        }

        return of(null).pipe(this.#loadAll());
      }),
      map(() => id),
      map((id) => this.contracts().find((c) => c.id === id)),
      filter((contract): contract is Contract => !!contract),
      tap((contract) =>
        this.#state.update((state) => ({
          ...state,
          selectedContract: contract,
        }))
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

  createContract(contract: Contract) {
    const contractDto: ContractDto = {
      id: `${Math.random()}`,
      policyNumber: contract.policyNumber,
      insuranceStartOn: contract.insuranceStartOn,
      customer: contract.customer?.id ?? '',
      status: contract.status,
    };

    return this.#contractDataService.post(contractDto).pipe(
      tap(() =>
        this.#state.update((state) => ({
          ...state,
          contracts: [...this.contracts(), contract],
        }))
      )
    );
  }

  updateContract(contract: Contract) {
    const contractDto: ContractDto = {
      id: contract.id,
      policyNumber: contract.policyNumber,
      insuranceStartOn: contract.insuranceStartOn,
      customer: contract.customer?.id ?? '',
      status: contract.status,
    };

    return this.#contractDataService.put(contractDto).pipe(
      tap(() =>
        this.#state.update((state) => ({
          ...state,
          contracts: this.contracts().map((c) =>
            c.id === contract.id ? contract : c
          ),
        }))
      )
    );
  }

  #loadAll(): (source$: Observable<void | null>) => Observable<Contract[]> {
    return (source$) =>
      source$.pipe(
        switchMap(() => this.#contractDataService.getAll()),
        switchMap((contracts) =>
          this.#customerDataService.getAll().pipe(
            map((customers) => ({
              contracts,
              customers: customers.map((c) => {
                const customer: Customer = {
                  id: c.id,
                  label: `${c.firstName} ${c.lastName}`,
                  phone: c.phone,
                  email: c.email,
                };

                return customer;
              }),
            }))
          )
        ),
        map(({ contracts, customers }) =>
          contracts.map((c) => {
            const contract: Contract = {
              ...c,
              customer: customers.find(
                (customer) => customer.id === c.customer
              ),
            };

            return contract;
          })
        ),
        tap((contracts) =>
          this.#state.update((state) => ({ ...state, contracts }))
        )
      );
  }
}
