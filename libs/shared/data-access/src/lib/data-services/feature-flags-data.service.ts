import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeatureFlags } from '@ng-journal/shared/utils-feature-flags';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsDataService {
  readonly #http = inject(HttpClient);

  getFeatureFlags() {
    return this.#http.get<FeatureFlags>('/assets/feature-flags.manifest.json');
  }
}
