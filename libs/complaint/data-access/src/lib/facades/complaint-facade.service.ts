import { Injectable, inject } from '@angular/core';
import { ComplaintState } from '../state/complaint-state.model';
import { ComplaintDataService } from '../data-services/complaint-data.service';

const initialState: Readonly<ComplaintState> = {};

@Injectable({
  providedIn: 'root',
})
export class ComplaintFacadeService {
  readonly #complaintDataService = inject(ComplaintDataService);
}
