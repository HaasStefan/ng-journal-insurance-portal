import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { FeatureFlagsFacadeService } from './facades/feature-flags-facade.service';

function initializeFeatureFlags() {
  const featureFlagsFacade = inject(FeatureFlagsFacadeService);
  return () => featureFlagsFacade.loadFeatureFlags();
}

export function provideFeatureFlags(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeFeatureFlags(),
      deps: [FeatureFlagsFacadeService],
      multi: true,
    },
  ]);
}
