import { Injectable, inject, signal, computed } from '@angular/core';
import { ClaimState } from '../state/claim-state.model';
import { ClaimDataService } from '../data-services/claim-data.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { Claim, ClaimDto, ContractOption } from '@ng-journal/claim/models';
import { ContractDataService } from '@ng-journal/contract/api-claim';
import { CustomerDataService } from '@ng-journal/customer/api-claim';

const initialState: Readonly<ClaimState> = {
  claims: [],
  selectedClaim: null,
  contracts: [],
};

@Injectable({
  providedIn: 'root',
})
export class ClaimFacadeService {
  readonly #claimDataService = inject(ClaimDataService);
  readonly #contractDataService = inject(ContractDataService);
  readonly #customerDataService = inject(CustomerDataService);

  readonly #state = signal(initialState);
  readonly claims = computed(() => this.#state().claims);
  readonly selectedClaim = computed(() => this.#state().selectedClaim);
  readonly contracts = computed(() => this.#state().contracts);

  loadClaims() {
    return this.#claimDataService.getAll().pipe(
      switchMap((claims) =>
        this.#contractDataService
          .getAll()
          .pipe(map((contracts) => ({ claims, contracts })))
      ),
      switchMap(({ claims, contracts }) =>
        this.#customerDataService
          .getAll()
          .pipe(map((customers) => ({ claims, contracts, customers })))
      ),
      map(({ claims, contracts, customers }) =>
        claims.map((claimDto) => {
          const contract = contracts.find((c) => c.id === claimDto.contract);
          if (!contract) {
            return null;
          }

          const customer = customers.find((c) => c.id === contract.customer);
          if (!customer) {
            return null;
          }

          const claim: Claim = {
            ...claimDto,
            contract: {
              id: contract.id,
              policyNumber: contract.policyNumber,
              customer: {
                id: customer.id,
                name: `${customer.firstName} ${customer.lastName}`,
              },
            },
          };
          return claim;
        })
      ),
      filter((claims): claims is Claim[] => !!claims),
      tap((claims) =>
        this.#state.update((state) => ({
          ...state,
          claims,
        }))
      )
    );
  }

  loadClaim(id: string) {
    return this.#claimDataService.get(id).pipe(
      switchMap((claimDto) =>
        this.#contractDataService
          .get(claimDto.contract)
          .pipe(map((contract) => ({ claimDto, contract })))
      ),
      switchMap(({ claimDto, contract }) =>
        this.#customerDataService
          .get(contract.customer)
          .pipe(map((customer) => ({ claimDto, contract, customer })))
      ),
      map(({ claimDto, contract, customer }) => {
        const claim: Claim = {
          ...claimDto,
          contract: {
            id: contract.id,
            policyNumber: contract.policyNumber,
            customer: {
              id: customer.id,
              name: `${customer.firstName} ${customer.lastName}`,
            },
          },
        };
        return claim;
      }),
      tap((claim) =>
        this.#state.update((state) => ({
          ...state,
          selectedClaim: claim,
        }))
      )
    );
  }

  createClaim(claim: Claim) {
    const claimDto: ClaimDto = {
      ...claim,
      contract: claim.contract.id,
    };

    return this.#claimDataService.post(claimDto).pipe(
      tap(() =>
        this.#state.update((state) => ({
          ...state,
          claims: [...state.claims, claim],
        }))
      )
    );
  }

  loadContracts() {
    return this.#contractDataService.getAll().pipe(
      map((contracts) =>
        contracts.map(
          (contract) =>
            ({
              id: contract.id,
              policyNumber: contract.policyNumber,
            } as ContractOption)
        )
      ),
      tap((contracts) =>
        this.#state.update((state) => ({
          ...state,
          contracts,
        }))
      )
    );
  }
}
