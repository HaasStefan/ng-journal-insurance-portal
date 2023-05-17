import { ContractStatus } from './contrac-status.model';

export interface Contract {
  id: string;
  customer: {
    label: string;
    phone: string;
  };
  claims: string[];
  status: ContractStatus;
}
