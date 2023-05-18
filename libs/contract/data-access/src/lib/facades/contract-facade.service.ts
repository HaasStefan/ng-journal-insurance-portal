import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ContractState } from '../state/contract-state.model';
import { ContractDataService } from '../data-services/contract-data.service';
import { map, pipe, switchMap } from 'rxjs';
import { CustomerDataService } from '@ng-journal/customer/api-contract';
import { Customer } from '@ng-journal/contract/models';
import { ContractViewModel } from '../state/contract-view.model';

const initialState: ContractState = {
  contracts: [],
};

@Injectable({
  providedIn: 'root',
})
export class ContractFacadeService extends ComponentStore<ContractState> {
  readonly #contractDataService = inject(ContractDataService);
  readonly #customerDataService = inject(CustomerDataService);
  readonly contracts$ = this.select((state) => state.contracts);

  readonly loadAll = this.effect<void>(
    pipe(
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
                email: c.email
              };

              return customer;
            }),
          }))
        )
      ),
      map(({ contracts, customers }) =>
        contracts.map((c) => {
          const contract: ContractViewModel = {
            ...c,
            customer: customers.find(
              (customer) => customer.id === c.customer
            ),
          };

          return contract;
        })
      ),
      tapResponse(
        (contracts: ContractViewModel[]) => this.patchState({ contracts }),
        (error) => console.error(error)
      )
    )
  );

  constructor() {
    super(initialState);
  }
}
