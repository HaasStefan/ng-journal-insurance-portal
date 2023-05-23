import { Customer } from '@ng-journal/customer/models';

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
}
