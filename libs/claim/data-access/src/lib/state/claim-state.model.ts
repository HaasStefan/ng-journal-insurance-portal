import { Claim, ContractOption } from '@ng-journal/claim/models';

export interface ClaimState {
  claims: Claim[];
  selectedClaim: Claim | null;
  contracts: ContractOption[];
}
