import { Complaint } from '../dtos/complaint.model';
import { Customer } from './customer.model';

export type ComplaintViewModel = Omit<Complaint, 'customer'> & {
  customer: Customer | null;
};
