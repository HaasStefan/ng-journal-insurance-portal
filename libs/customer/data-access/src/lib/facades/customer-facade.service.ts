import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CustomerState } from '../state/customer-state.model';
import { CustomerDataService } from '../data-services/customer-data.service';

const initialState: CustomerState = {};

@Injectable({
  providedIn: 'root',
})
export class CustomerFacadeService extends ComponentStore<CustomerState> {
  readonly #customerDataService = inject(CustomerDataService);

  constructor() {
    super(initialState);
  }
}
