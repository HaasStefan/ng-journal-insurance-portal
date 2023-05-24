import { Claim } from '@ng-journal/claim/models';

export interface ClaimState {
  claims: Claim[];
  selectedClaim: Claim | null;
}
