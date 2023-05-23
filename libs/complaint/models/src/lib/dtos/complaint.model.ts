import { ComplaintType } from './complaint-type.model';

export interface Complaint {
  id: string;
  customer: string;
  type: ComplaintType;
  description: string;
}
