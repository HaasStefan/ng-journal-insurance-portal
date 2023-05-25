export interface Claim {
  id: string;
  claimNumber: string;
  damageType: DamageType;
  contract: string;
  description: string;
  date: Date;
}

export enum DamageType {
  Collision = 'Collision',
  Explosion = 'Explosion',
  Fire = 'Fire',
  Theft = 'Theft',
  Vandalism = 'Vandalism',
}
