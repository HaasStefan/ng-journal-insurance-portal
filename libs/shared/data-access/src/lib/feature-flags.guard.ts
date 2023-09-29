import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { FeatureFlag } from '@ng-journal/shared/utils-feature-flags';
import { FeatureFlagsFacadeService } from './facades/feature-flags-facade.service';

export function featureFlagGuard(featureFlag: FeatureFlag): CanMatchFn {
  return () => {
    const featureFlagsFacade = inject(FeatureFlagsFacadeService);
    const enabled = featureFlagsFacade.featureFlagEnabled(featureFlag);
    return enabled;
  };
}
