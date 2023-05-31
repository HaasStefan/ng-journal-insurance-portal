import { DamageTypeDto } from './dtos/damage-type.model';

export type DamageType = DamageTypeDto;

export const damageTypes = Object.values(DamageTypeDto);

export interface DamageTypeOption {
  id: DamageType;
  label: DamageType;
}
