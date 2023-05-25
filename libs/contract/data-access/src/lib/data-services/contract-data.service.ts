import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ContractDto } from '@ng-journal/contract/models';

@Injectable({
  providedIn: 'root',
})
export class ContractDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.#http.get<ContractDto>(`${this.#baseUrl}contracts/${id}`);
  }

  getAll() {
    return this.#http.get<ContractDto[]>(`${this.#baseUrl}contracts`);
  }

  post(contract: ContractDto) {
    return this.#http.post<ContractDto>(`${this.#baseUrl}contracts`, contract);
  }

  put(contract: ContractDto) {
    return this.#http.put<ContractDto>(`${this.#baseUrl}contracts`, contract);
  }
}
