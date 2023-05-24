import { Contract, Customer } from '@ng-journal/contract/models';

export interface ContractState {
  selectedContract: Contract | null;
  contracts: Contract[];
  customers: Customer[];
}
