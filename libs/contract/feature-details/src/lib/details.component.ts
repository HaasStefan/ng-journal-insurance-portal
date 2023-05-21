import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
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

    <ng-container *ngIf="contract$ | async as contract">
      <ng-journal-card additionalClasses="grid">
        <div class="col-3 font-bold">Status:</div>
        <div class="col-3">
          <ng-journal-contract-status-chip
            [label]="contract.status"
            [style]="contract.status | contractStatusChipStyle"
          />
        </div>

        <div class="col-3 font-bold">Policynumber:</div>
        <div class="col-3">{{ contract.policyNumber }}</div>
        <div class="col-3 font-bold">Insurance Start:</div>
        <div class="col-3">{{ contract.insuranceStartOn | date }}</div>

        <div class="col-3 font-bold">Customer:</div>
        <div class="col-3">
          <ng-journal-hyperlink [route]="['/customers', contract.customer?.id]">
            {{ contract.customer?.label }}
          </ng-journal-hyperlink>
        </div>

        <div class="col-3 font-bold">Phone:</div>
        <div class="col-3">{{ contract.customer?.phone }}</div>
        <div class="col-3 font-bold">Email:</div>
        <div class="col-3">{{ contract.customer?.email }}</div>
      </ng-journal-card>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly contract$ = this.#contractFacade.selectedContract$;
  #id!: string;
  @Input() set id(id: string) {
    this.#contractFacade.loadContract(id);
    this.#id = id;
  }
  get id(): string {
    return this.#id;
  }

  onEditButtonClicked(): void {
    this.#router.navigate(['edit', this.id], {
      relativeTo: this.#route.parent,
    });
  }
}
