import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';

type CustomerType = unknown;

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.#http.get<CustomerType>(`${this.#baseUrl}/customer/${id}`);
  }

  getAll() {
    return this.#http.get<CustomerType[]>(`${this.#baseUrl}/customers`);
  }
}
