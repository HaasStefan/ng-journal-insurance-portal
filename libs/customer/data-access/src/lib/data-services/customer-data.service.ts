import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { Customer } from '@ng-journal/customer/models';


@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  getAll() {
    return this.#http.get<Customer[]>(`${this.#baseUrl}/assets/customers.json`);
  }
}
