import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ComplaintDto } from '@ng-journal/complaint/models';
import { delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplaintDataService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(BaseUrl);

  get(id: string) {
    return this.getAll().pipe(
      map((complaints) => complaints.find((c) => c.id === id) ?? null)
    );
  }

  getAll() {
    return this.#http.get<ComplaintDto[]>(
      `${location.origin}/assets/complaints.json`
    );
  }

  post(complaint: ComplaintDto) {
    // fake http call
    return of(complaint).pipe(delay(1000));
  }
}
