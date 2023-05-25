import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ContractDto } from '@ng-journal/contract/models';
import { delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.getAll().pipe(
      map((contracts) => contracts.find((c) => c.id === id) ?? null)
    );
  }

  getAll() {
    return this.#http.get<ContractDto[]>(
      `${location.origin}/assets/contracts.json`
    );
  }

  post(contract: ContractDto) {
    // fake http call
    return of(contract).pipe(delay(1000));
  }

  put(contract: ContractDto) {
    // fake http call
    return of(contract).pipe(delay(1000));
  }
}
