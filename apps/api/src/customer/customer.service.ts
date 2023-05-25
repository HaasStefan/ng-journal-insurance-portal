import { Injectable } from '@nestjs/common';
import { BehaviorSubject, filter, map } from 'rxjs';
import { Customer } from './customer.interface';
import { faker } from '@faker-js/faker';

@Injectable()
export class CustomerService {
  readonly #customers = new BehaviorSubject<Customer[]>([]);

  constructor() {
    for (let i = 0; i < 10; i++) {
      const customer: Customer = {
        id: faker.string.uuid(),
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
    }
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
