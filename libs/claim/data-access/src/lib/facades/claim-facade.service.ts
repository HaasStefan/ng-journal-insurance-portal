import { Injectable, inject, signal, computed } from '@angular/core';
import { ClaimState } from '../state/claim-state.model';
import { ClaimDataService } from '../data-services/claim-data.service';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { Claim } from '@ng-journal/claim/models';
import { ContractDataService } from '@ng-journal/contract/api-claim';
import { CustomerDataService } from '@ng-journal/customer/api-claim';

const initialState: Readonly<ClaimState> = {
  claims: [],
  selectedClaim: null,
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
  #loaded = false;

  loadClaims() {
    return of(null).pipe(
      filter(() => !this.#loaded),
      this.#loadAll(),
      tap(() => (this.#loaded = true))
    );
  }

  loadClaim(id: string) {
    return of(null).pipe(
      switchMap(() => {
        if (this.#loaded) {
          return of(null);
        }

        return of(null).pipe(this.#loadAll());
      }),
      map(() => id),
      map((id) => this.claims().find((c) => c.id === id)),
      filter((claim): claim is Claim => !!claim),
      tap((claim) =>
        this.#state.update((state) => ({
          ...state,
          selectedClaim: claim,
        }))
      )
    );
  }

  #loadAll(): (source$: Observable<void | null>) => Observable<Claim[]> {
    return (source$) =>
      source$.pipe(
        switchMap(() => this.#claimDataService.getAll()),
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
}
