import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { Customer } from '@ng-journal/customer/models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.getAll().pipe(
      map((customers) => customers.find((c) => c.id === id) ?? null)
    );
  }

  getAll() {
    return this.#http.get<Customer[]>(`${this.#baseUrl}/assets/customers.json`);
  }
}
