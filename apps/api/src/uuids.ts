import { faker } from '@faker-js/faker';

export const customer_uuids = [...Array(30).keys()].map(() =>
  faker.string.uuid()
);
export const contract_uuids = [...Array(20).keys()].map(() =>
  faker.string.uuid()
);
export const claim_uuids = [...Array(5).keys()].map(() => faker.string.uuid());
export const complaint_uuids = [...Array(2).keys()].map(() =>
  faker.string.uuid()
);
