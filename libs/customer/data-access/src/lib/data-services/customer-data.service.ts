import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { Customer } from '@ng-journal/customer/models';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  readonly #http = inject(HttpClient);
  readonly #url = `${inject(BaseUrl)}customers`;

  get(id: string) {
    return this.#http.get<Customer>(`${this.#url}/${id}`);
  }

  getAll() {
    return this.#http.get<Customer[]>(this.#url);
  }
}
