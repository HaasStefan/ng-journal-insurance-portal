import { ComplaintViewModel } from '@ng-journal/complaint/models';

export interface ComplaintState {
  complaints: ComplaintViewModel[];
  selectedComplaint: ComplaintViewModel | null;
}
