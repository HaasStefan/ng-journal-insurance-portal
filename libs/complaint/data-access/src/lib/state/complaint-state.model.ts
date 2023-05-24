import { ComplaintViewModel, Customer } from '@ng-journal/complaint/models';

export interface ComplaintState {
  complaints: ComplaintViewModel[];
  selectedComplaint: ComplaintViewModel | null;
  customers: Customer[];
}
