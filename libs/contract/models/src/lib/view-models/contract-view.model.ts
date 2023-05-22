import { Contract } from '../dtos/contract.model';
import { Customer } from './customer.model';

export type ContractViewModel = Omit<Contract, 'customer'> & {
  customer?: Customer;
};
