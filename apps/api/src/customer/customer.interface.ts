export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: {
    city: string;
    street: string;
    state: string;
    zip: string;
  };
}
