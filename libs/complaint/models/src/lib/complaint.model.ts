import { ComplaintDto } from './dtos/complaint-dto.model';
import { Customer } from './customer.model';

export type Complaint = Omit<ComplaintDto, 'customer'> & {
  customer: Customer | null;
};
