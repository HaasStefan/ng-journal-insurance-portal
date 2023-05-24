import { AddressDto } from './address.model';

export interface CustomerDto {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: AddressDto;
}
