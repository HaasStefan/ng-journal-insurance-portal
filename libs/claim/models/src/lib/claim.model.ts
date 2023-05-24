import { ClaimDto } from './dtos/claim-dto.model';

export type Claim = Omit<ClaimDto, 'contract'> & {
  contract: {
    id: string;
    policyNumber: string;
    customer: {
      id: string;
      name: string;
    };
  };
};
