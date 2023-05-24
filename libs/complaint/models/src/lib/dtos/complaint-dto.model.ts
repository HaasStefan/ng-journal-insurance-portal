import { ComplaintTypeDto } from './complaint-type-dto.model';

export interface ComplaintDto {
  id: string;
  customer: string;
  type: ComplaintTypeDto;
  date: Date;
  description: string;
}
