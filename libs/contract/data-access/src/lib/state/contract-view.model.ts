import { Contract, Customer } from '@ng-journal/contract/models';

export type ContractViewModel = Omit<Contract, 'customer'> & {
  customer?: Customer;
};
