import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';
import { ClaimFormComponent } from '@ng-journal/claim/ui';
import {
  ButtonComponent,
  CardComponent,
  HeaderComponent,
} from '@ng-journal/shared/ui';
import { ButtonActionDirective } from '@ng-journal/shared/ui-directives';
import { MessageService } from 'primeng/api';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { createClaimForm } from '@ng-journal/claim/utils';
import { Claim, ContractOption } from '@ng-journal/claim/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [
    CommonModule,
    ClaimFormComponent,
    HeaderComponent,
    CardComponent,
    ButtonComponent,
    ButtonActionDirective,
  ],
  template: ` <ng-journal-header title="Complaint Create" />
    <ng-journal-card>
      <ng-journal-claim-form [form]="form" [contracts]="contracts() ?? []" />
    </ng-journal-card>

    <div class="p-2">
      <ng-journal-button
        label="Save"
        style="primary"
        type="submit"
        width="100%"
        [action]="action()"
        (clickEvent)="createClaim()"
        [disabled]="form.invalid"
      />
    </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #claimFacade = inject(ClaimFacadeService);
  readonly #messageService = inject(MessageService);
  readonly #contracts$ = toObservable(this.#claimFacade.contracts).pipe(
    map((contracts) =>
      contracts.map((contract) => {
        const contractOption: ContractOption = {
          id: contract.id,
          policyNumber: contract.policyNumber,
        };
        return contractOption;
      })
    )
  );
  readonly contracts = toSignal(this.#contracts$);
  readonly #loadcontracts$ = this.#claimFacade
    .loadContracts()
    .pipe(takeUntilDestroyed());
  readonly form = createClaimForm();
  readonly action = signal<Observable<unknown> | null>(null);

  ngOnInit() {
    this.#loadcontracts$.subscribe();
  }

  createClaim() {
    const { date, damageType, description, contract, claimNumber } =
      this.form.getRawValue();

    if (
      !!date &&
      !!damageType &&
      !!description &&
      !!contract &&
      !!claimNumber
    ) {
      const claim: Claim = {
        id: `${Math.floor(Math.random() * 100000)}`,
        claimNumber,
        date,
        damageType: damageType.label,
        description,
        contract: {
          id: contract.id,
          policyNumber: contract.policyNumber,
        },
      };

      this.action.set(
        this.#claimFacade.createClaim(claim).pipe(
          tap(() => this.form.reset()),
          tap(() => {
            this.#messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Claim created successfully',
            });
          }),
          tap((c) =>
            this.#router.navigate(['../', c.id, 'details'], {
              relativeTo: this.#route,
            })
          )
        )
      );
    }
  }
}
