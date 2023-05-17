import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { Contract } from '@ng-journal/contract/models';

@Injectable({
  providedIn: 'root',
})
export class ContractDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  getAll() {
    return this.#http.get<Contract[]>(`${this.#baseUrl}/assets/contracts.json`);
  }
}
