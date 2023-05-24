import { ClaimDto } from './dtos/claim-dto.model';

export type Claim = Omit<ClaimDto, 'contract'> & {
  contract: {
    policyNumber: string;
    customer: {
      id: string;
      label: string;
    };
  };
};
