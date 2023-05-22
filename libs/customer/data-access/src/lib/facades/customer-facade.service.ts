import { Injectable, inject } from '@angular/core';
import { CustomerState } from '../state/customer-state.model';
import { CustomerDataService } from '../data-services/customer-data.service';

const initialState: CustomerState = {};

@Injectable({
  providedIn: 'root',
})
export class CustomerFacadeService {
  readonly #customerDataService = inject(CustomerDataService);
}
