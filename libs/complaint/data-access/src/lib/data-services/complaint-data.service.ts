import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';

type ComplaintType = unknown;

@Injectable({
  providedIn: 'root',
})
export class ComplaintDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.#http.get<ComplaintType>(`${this.#baseUrl}/complaint/${id}`);
  }

  getAll() {
    return this.#http.get<ComplaintType[]>(`${this.#baseUrl}/complaints`);
  }
}
