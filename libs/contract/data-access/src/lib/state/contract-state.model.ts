import { ContractViewModel, Customer } from '@ng-journal/contract/models';

export interface ContractState {
  selectedContract: ContractViewModel | null;
  contracts: ContractViewModel[];
  customers: Customer[];
}
