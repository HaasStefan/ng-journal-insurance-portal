import { Complaint, Customer } from '@ng-journal/complaint/models';

export interface ComplaintState {
  complaints: Complaint[];
  selectedComplaint: Complaint | null;
  customers: Customer[];
}
