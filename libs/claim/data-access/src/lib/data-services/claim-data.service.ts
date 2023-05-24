import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ClaimDto } from '@ng-journal/claim/models';
import { delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClaimDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.getAll().pipe(
      map((claims) => claims.find((c) => c.id === id) ?? null)
    );
  }

  getAll() {
    return this.#http.get<ClaimDto[]>(`${this.#baseUrl}/assets/claims.json`);
  }

  post(claim: ClaimDto) {
    // fake http call
    return of(claim).pipe(delay(1000));
  }
}
