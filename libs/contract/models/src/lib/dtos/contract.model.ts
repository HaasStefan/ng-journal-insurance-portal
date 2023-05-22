import { ContractStatus } from './contrac-status.model';

export interface Contract {
  id: string;
  policyNumber: string;
  insuranceStartOn: Date;
  customer: string;
  claims: string[];
  status: ContractStatus;
}
