import {
  Injectable,
  inject,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureFlag } from '@ng-journal/shared/utils-feature-flags';
import { lastValueFrom, tap } from 'rxjs';
import { FeatureFlagsDataService } from '../data-services/feature-flags-data.service';
import { FeatureFlagsState } from '../state/feature-flags-state.model';

const initialState: Readonly<FeatureFlagsState> = {
  featureFlags: null,
};

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagsFacadeService {
  readonly #featureFlagsDataService = inject(FeatureFlagsDataService);
  readonly #destroyRef = inject(DestroyRef);

  readonly #state = signal(initialState);
  readonly featureFlags = computed(() => this.#state().featureFlags);

  async loadFeatureFlags() {
    return await lastValueFrom(
      this.#featureFlagsDataService.getFeatureFlags().pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((featureFlags) =>
          this.#state.set({
            featureFlags,
          })
        )
      )
    );
  }

  featureFlagEnabled(featureFlag: FeatureFlag) {
    return this.featureFlags()?.[featureFlag] ?? false;
  }
}
