import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '@ng-journal/shared/utils';
import { ComplaintDto } from '@ng-journal/complaint/models';

@Injectable({
  providedIn: 'root',
})
export class ComplaintDataService {
  readonly #http = inject(HttpClient);
  readonly #url = `${inject(BaseUrl)}complaints`;

  get(id: string) {
    return this.#http.get<ComplaintDto>(`${this.#url}/${id}`);
  }

  getAll() {
    return this.#http.get<ComplaintDto[]>(this.#url);
  }

  post(complaint: ComplaintDto) {
    return this.#http.post<ComplaintDto>(this.#url, complaint);
  }
}
