import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ContractDto } from '@ng-journal/contract/models';

@Injectable({
  providedIn: 'root',
})
export class ContractDataService {
  readonly #http = inject(HttpClient);
  readonly #url = `${inject(BaseUrl)}contracts`;

  get(id: string) {
    return this.#http.get<ContractDto>(`${this.#url}/${id}`);
  }

  getAll() {
    return this.#http.get<ContractDto[]>(this.#url);
  }

  post(contract: ContractDto) {
    return this.#http.post<ContractDto>(this.#url, contract);
  }

  put(contract: ContractDto) {
    return this.#http.put<ContractDto>(this.#url, contract);
  }
}
