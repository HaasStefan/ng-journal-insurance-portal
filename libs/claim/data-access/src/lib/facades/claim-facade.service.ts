import { Injectable, inject } from '@angular/core';
import { ClaimState } from '../state/claim-state.model';
import { ClaimDataService } from '../data-services/claim-data.service';

const initialState: Readonly<ClaimState> = {};

@Injectable({
  providedIn: 'root',
})
export class ClaimFacadeService {
  readonly #claimDataService = inject(ClaimDataService);
}
