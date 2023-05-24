import { DamageType } from './damage-type.model';
import { ClaimDto } from './dtos/claim-dto.model';

export type Claim = Omit<Omit<ClaimDto, 'contract'>, 'damageType'> & {
  damageType: DamageType;
  contract: {
    id: string;
    policyNumber: string;
    customer: {
      id: string;
      name: string;
    };
  };
};
