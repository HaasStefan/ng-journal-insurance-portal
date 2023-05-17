import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ComplaintState } from '../state/complaint-state.model';
import { ComplaintDataService } from '../data-services/complaint-data.service';

const initialState: ComplaintState = {};

@Injectable({
  providedIn: 'root',
})
export class ComplaintFacadeService extends ComponentStore<ComplaintState> {
  readonly #complaintDataService = inject(ComplaintDataService);

  constructor() {
    super(initialState);
  }
}
