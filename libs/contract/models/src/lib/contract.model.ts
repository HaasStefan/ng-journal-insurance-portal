import { ContractDto } from './dtos/contract.model';
import { Customer } from './customer.model';

export type Contract = Omit<ContractDto, 'customer'> & {
  customer?: Customer;
};
