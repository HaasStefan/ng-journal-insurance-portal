import { Injectable, Logger } from '@nestjs/common';
import { BehaviorSubject, map } from 'rxjs';
import { Customer } from './customer.interface';
import { faker } from '@faker-js/faker';
import { customer_uuids } from '../uuids';

@Injectable()
export class CustomerService {
  readonly #customers = new BehaviorSubject<Customer[]>([]);

  get customers() {
    return this.#customers.getValue();
  }

  constructor() {
    customer_uuids.forEach((uuid) => {
      const customer: Customer = {
        id: uuid,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: {
          city: faker.location.city(),
          street: faker.location.street(),
          state: faker.location.state(),
          zip: faker.location.zipCode(),
        },
      };
      this.add(customer);
    });
  }

  add(customer: Customer) {
    this.#customers.next([...this.#customers.value, customer]);
  }

  get(id: string) {
    return this.#customers.pipe(
      map(
        (customers) => customers.find((customer) => customer.id === id) ?? null
      )
    );
  }

  getAll() {
    return this.#customers.asObservable();
  }
}
