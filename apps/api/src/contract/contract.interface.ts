export interface Contract {
  id: string;
  policyNumber: string;
  insuranceStartOn: Date;
  customer: string;
  status: ContractStatus;
}

export enum ContractStatus {
  Pending = 'Pending',
  Active = 'Active',
  Inactive = 'Inactive',
}
