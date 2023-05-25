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

  loadContracts() {
    return this.#contractDataService.getAll().pipe(
      switchMap((contracts) =>
        this.#customerDataService
          .getAll()
          .pipe(map((customers) => ({ contracts, customers })))
      ),
      map(({ contracts, customers }) =>
        contracts.map((contractDto) => {
          const customer = customers.find((c) => c.id === contractDto.customer);
          if (!customer) {
            return null;
          }

          const contract: Contract = {
            ...contractDto,
            customer: {
              id: customer.id,
              phone: customer.phone,
              email: customer.email,
              label: `${customer.firstName} ${customer.lastName}`,
            },
          };

          return contract;
        })
      ),
      filter((contracts): contracts is Contract[] => !!contracts),
      tap((contracts) =>
        this.#state.update((state) => ({
          ...state,
          contracts,
        }))
      )
    );
  }

  loadContract(id: string) {
    return this.#contractDataService.get(id).pipe(
      switchMap((contractDto) =>
        this.#customerDataService.get(contractDto.customer).pipe(
          map((customer) => ({
            ...contractDto,
            customer: {
              id: customer.id,
              phone: customer.phone,
              email: customer.email,
              label: `${customer.firstName} ${customer.lastName}`,
            },
          }))
        )
      ),
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
      id: `${Math.floor(Math.random() * 100000)}`,
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
}
