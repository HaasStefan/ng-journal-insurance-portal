import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ClaimDto } from '@ng-journal/claim/models';

@Injectable({
  providedIn: 'root',
})
export class ClaimDataService {
  readonly #http = inject(HttpClient);
  readonly #url = `${inject(BaseUrl)}claims`;

  get(id: string) {
    return this.#http.get<ClaimDto>(`${this.#url}/${id}`);
  }

  getAll() {
    return this.#http.get<ClaimDto[]>(this.#url);
  }

  post(claim: ClaimDto) {
    return this.#http.post<ClaimDto>(this.#url, claim);
  }
}
