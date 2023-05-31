import { DamageTypeDto } from './damage-type.model';

export interface ClaimDto {
  id: string;
  claimNumber: string;
  damageType: DamageTypeDto;
  contract: string;
  description: string;
  date: Date;
}
