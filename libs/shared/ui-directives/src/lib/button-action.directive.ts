import { Directive, inject, Input, OnDestroy } from '@angular/core';
import { ButtonComponent } from '@ng-journal/shared/ui';
import {
  finalize,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  selector: 'ng-journal-button [action]',
  standalone: true,
})
export class ButtonActionDirective implements OnDestroy {
  readonly #host = inject(ButtonComponent);
  readonly #destroy = new Subject<void>();

  @Input()
  public set action(value$: Observable<unknown> | null) {
    this.#destroy.next();

    if (value$) {
      of(null)
        .pipe(
          tap(() => this.#host.loading.set(true)),
          switchMap(() => value$),
          finalize(() => this.#host.loading.set(false)),
          takeUntil(this.#destroy)
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.#destroy.next();
    this.#destroy.complete();
  }
}
