import { DamageType } from './damage-type.model';

export interface ClaimDto {
  id: string;
  damageType: DamageType;
  contract: string;
  description: string;
  date: Date;
}
