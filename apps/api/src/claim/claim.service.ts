import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject, map } from 'rxjs';
import { claim_uuids, contract_uuids } from '../uuids';
import { Claim, DamageType } from './claim.interface';

@Injectable()
export class ClaimService {
  readonly #claims = new BehaviorSubject<Claim[]>([]);

  constructor() {
    claim_uuids.forEach((uuid) => {
      const claim: Claim = {
        id: uuid,
        claimNumber: faker.finance.accountNumber(),
        contract:
          contract_uuids[
            faker.number.int({
              min: 0,
              max: contract_uuids.length - 1,
            })
          ],
        description: faker.lorem.paragraph(),
        date: faker.date.past(),
        damageType: faker.helpers.arrayElement(Object.values(DamageType)),
      };
      this.add(claim);
    });
  }

  add(claim: Claim) {
    this.#claims.next([...this.#claims.value, claim]);
  }

  get(id: string) {
    return this.#claims.pipe(
      map((claims) => claims.find((claim) => claim.id === id) ?? null)
    );
  }

  getAll() {
    return this.#claims.asObservable();
  }
}
