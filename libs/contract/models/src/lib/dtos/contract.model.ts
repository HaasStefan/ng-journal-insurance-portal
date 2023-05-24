import { ContractStatusDto } from './contract-status.model';

export interface ContractDto {
  id: string;
  policyNumber: string;
  insuranceStartOn: Date;
  customer: string;
  status: ContractStatusDto;
}
