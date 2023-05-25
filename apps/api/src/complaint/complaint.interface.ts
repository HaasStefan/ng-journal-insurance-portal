export interface Complaint {
  id: string;
  customer: string;
  date: Date;
  description: string;
  type: ComplaintType;
}

export enum ComplaintType {
  CustomerService = 'CustomerService',
  Sales = 'Sales',
  Payments = 'Payments',
}
