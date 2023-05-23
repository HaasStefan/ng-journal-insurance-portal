import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import {
  CardComponent,
  HeaderComponent,
  HyperlinkComponent,
} from '@ng-journal/shared/ui';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ContractStatusChipComponent,
  ContractStatusChipStylePipe,
} from '@ng-journal/contract/ui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardComponent,
    HyperlinkComponent,
    ContractStatusChipComponent,
    ContractStatusChipStylePipe,
  ],
  template: `
    <ng-journal-header
      title="Contract Details"
      [showEditButton]="true"
      (editButtonClicked)="this.onEditButtonClicked()"
    />

    <ng-container *ngIf="contract() as contract">
      <ng-journal-card additionalClasses="grid">
        <div class="col-2 font-bold">Status:</div>
        <div class="col-4">
          <ng-journal-contract-status-chip
            [label]="contract.status"
            [style]="contract.status | contractStatusChipStyle"
          />
        </div>

        <div class="col-2 font-bold">Policynumber:</div>
        <div class="col-4">{{ contract.policyNumber }}</div>
        <div class="col-2 font-bold">Insurance Start:</div>
        <div class="col-4">{{ contract.insuranceStartOn | date }}</div>

        <div class="col-2 font-bold">Customer:</div>
        <div class="col-4">
          <ng-journal-hyperlink [route]="['/customer', contract.customer?.id]">
            {{ contract.customer?.label }}
          </ng-journal-hyperlink>
        </div>

        <div class="col-2 font-bold">Phone:</div>
        <div class="col-4">{{ contract.customer?.phone }}</div>
        <div class="col-2 font-bold">Email:</div>
        <div class="col-4">{{ contract.customer?.email }}</div>
      </ng-journal-card>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnDestroy {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly contract = this.#contractFacade.selectedContract;
  readonly #destroySetId = new Subject<void>();
  #id!: string;
  @Input() set id(id: string) {
    this.#destroySetId.next();
    this.#contractFacade
      .loadContract(id)
      .pipe(takeUntil(this.#destroySetId))
      .subscribe();

    this.#id = id;
  }
  get id(): string {
    return this.#id;
  }

  ngOnDestroy(): void {
    this.#destroySetId.next();
    this.#destroySetId.complete();
  }

  onEditButtonClicked(): void {
    this.#router.navigate(['edit', this.id], {
      relativeTo: this.#route.parent,
    });
  }
}
