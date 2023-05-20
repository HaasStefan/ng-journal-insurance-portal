import { Customer } from '@ng-journal/contract/models';
import { ContractViewModel } from './contract-view.model';

export interface ContractState {
  selectedContract: ContractViewModel | null;
  contracts: ContractViewModel[];
  customers: Customer[];
}
