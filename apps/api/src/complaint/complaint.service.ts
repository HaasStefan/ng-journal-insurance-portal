import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject, map } from 'rxjs';
import { complaint_uuids, customer_uuids } from '../uuids';
import { Complaint, ComplaintType } from './complaint.interface';

@Injectable()
export class ComplaintService {
  readonly #complaints = new BehaviorSubject<Complaint[]>([]);

  constructor() {
    complaint_uuids.forEach((uuid) => {
      const complaint: Complaint = {
        id: uuid,
        customer:
          customer_uuids[
            faker.number.int({
              min: 0,
              max: customer_uuids.length - 1,
            })
          ],
        description: faker.lorem.paragraph(),
        type: faker.helpers.arrayElement(Object.values(ComplaintType)),
        date: faker.date.past(),
      };
      this.add(complaint);
    });
  }

  add(complaint: Complaint) {
    this.#complaints.next([...this.#complaints.value, complaint]);
  }

  get(id: string) {
    return this.#complaints.pipe(
      map(
        (complaints) =>
          complaints.find((complaint) => complaint.id === id) ?? null
      )
    );
  }

  getAll() {
    return this.#complaints.asObservable();
  }
}
