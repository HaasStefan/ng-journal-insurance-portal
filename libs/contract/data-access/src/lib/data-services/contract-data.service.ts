import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';

type ContractType = unknown;

@Injectable({
  providedIn: 'root',
})
export class ContractDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.#http.get<ContractType>(`${this.#baseUrl}/contract/${id}`);
  }

  getAll() {
    return this.#http.get<ContractType[]>(`${this.#baseUrl}/contracts`);
  }
}
