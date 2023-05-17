import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ContractState } from '../state/contract-state.model';
import { ContractDataService } from '../data-services/contract-data.service';
import { pipe, switchMap } from 'rxjs';

const initialState: ContractState = {};

@Injectable({
  providedIn: 'root',
})
export class ContractFacadeService extends ComponentStore<ContractState> {
  readonly #contractDataService = inject(ContractDataService);

  readonly loadAll = this.effect<void>(
    pipe(switchMap(() => this.#contractDataService.getAll()))
  );

  constructor() {
    super(initialState);
  }
}
