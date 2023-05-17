import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';

type ClaimType = unknown;

@Injectable({
  providedIn: 'root',
})
export class ClaimDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.#http.get<ClaimType>(`${this.#baseUrl}/claim/${id}`);
  }

  getAll() {
    return this.#http.get<ClaimType[]>(`${this.#baseUrl}/claim`);
  }
}
