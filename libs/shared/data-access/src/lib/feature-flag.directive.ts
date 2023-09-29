import {
  Directive,
  effect,
  inject,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FeatureFlag } from '@ng-journal/shared/utils-feature-flags';
import { FeatureFlagsFacadeService } from './facades/feature-flags-facade.service';

@Directive({
  selector: '[ngJournalFeatureFlag]',
  standalone: true,
})
export class FeatureFlagDirective implements OnChanges {
  readonly #templateRef = inject(TemplateRef<unknown>);
  readonly #viewContainerRef = inject(ViewContainerRef);
  readonly #featureFlagsFacade = inject(FeatureFlagsFacadeService);

  @Input({ required: true, alias: 'ngJournalFeatureFlag' })
  featureFlag!: FeatureFlag | null;

  @Input() ngJournalFeatureFlagElse: TemplateRef<unknown> | null = null;

  constructor() {
    effect(() => {
      if (this.featureFlag) {
        this.#onChanges();
      }
    });
  }

  ngOnChanges() {
    this.#onChanges();
  }

  #onChanges() {
    this.#viewContainerRef.clear();
    if (this.#featureFlagEnabled()) {
      this.#viewContainerRef.createEmbeddedView(this.#templateRef);
    } else if (this.ngJournalFeatureFlagElse) {
      this.#viewContainerRef.createEmbeddedView(this.ngJournalFeatureFlagElse);
    }
  }

  #featureFlagEnabled() {
    if (!this.featureFlag) {
      return true;
    }

    return this.#featureFlagsFacade.featureFlagEnabled(this.featureFlag);
  }
}
