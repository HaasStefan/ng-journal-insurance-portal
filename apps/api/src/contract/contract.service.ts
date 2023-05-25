import { Injectable, Logger } from '@nestjs/common';
import { BehaviorSubject, map } from 'rxjs';
import { Contract, ContractStatus } from './contract.interface';
import { faker } from '@faker-js/faker';
import { contract_uuids, customer_uuids } from '../uuids';

@Injectable()
export class ContractService {
  readonly #contracts = new BehaviorSubject<Contract[]>([]);

  constructor() {
    contract_uuids.forEach((uuid) => {
      const contract: Contract = {
        id: uuid,
        customer:
          customer_uuids[
            faker.number.int({
              min: 0,
              max: customer_uuids.length - 1,
            })
          ],
        policyNumber: faker.finance.accountNumber(),
        insuranceStartOn: faker.date.past(),
        status: faker.helpers.arrayElement(Object.values(ContractStatus)),
      };
      Logger.log(contract);
      this.add(contract);
    });
  }

  add(contract: Contract) {
    this.#contracts.next([...this.#contracts.value, contract]);
  }

  update(contract: Contract) {
    this.#contracts.next(
      this.#contracts.value.map((c) => (c.id === contract.id ? contract : c))
    );
  }

  get(id: string) {
    return this.#contracts.pipe(
      map(
        (contracts) => contracts.find((contract) => contract.id === id) ?? null
      )
    );
  }

  getAll() {
    return this.#contracts.asObservable();
  }
}
