import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ClaimState } from '../state/claim-state.model';
import { ClaimDataService } from '../data-services/claim-data.service';

const initialState: ClaimState = {};

@Injectable({
  providedIn: 'root',
})
export class ClaimFacadeService extends ComponentStore<ClaimState> {
  readonly #claimDataService = inject(ClaimDataService);

  constructor() {
    super(initialState);
  }
}