import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';
import { Subject, takeUntil } from 'rxjs';
import {
  CardComponent,
  HeaderComponent,
  HyperlinkComponent,
} from '@ng-journal/shared/ui';
import { primeNgModules } from '@ng-journal/shared/utils';
import { FeatureFlagDirective } from '@ng-journal/shared/data-access';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    CardComponent,
    HyperlinkComponent,
    ...primeNgModules,
    FeatureFlagDirective,
  ],
  template: `<ng-journal-header title="Complaint Details" />
    <ng-container *ngIf="complaint() as complaint">
      <ng-journal-card additionalClasses="grid">
        <div class="col-2 font-bold">Customer:</div>
        <div class="col-4">
          <ng-journal-hyperlink
            *ngJournalFeatureFlag="
              'customer-details';
              else customerDetailsDisabled
            "
            [route]="['/customer', complaint.customer?.id, 'details']"
          >
            {{ complaint.customer?.label }}
          </ng-journal-hyperlink>
          <ng-template #customerDetailsDisabled>
            {{ complaint.customer?.label }}
          </ng-template>
        </div>
        <div class="col-2 font-bold">Type:</div>
        <div class="col-4">
          {{ complaint.type }}
        </div>
        <div class="col-2 font-bold">Date:</div>
        <div class="col-4">
          {{ complaint.date | date }}
        </div>
        <div class="col-2 font-bold">Description:</div>
        <div class="col-4">
          {{ complaint.description }}
        </div>
      </ng-journal-card>
    </ng-container> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnDestroy {
  readonly #complaintFacade = inject(ComplaintFacadeService);
  readonly complaint = this.#complaintFacade.selectedComplaint;
  readonly #destroySetId = new Subject<void>();
  @Input() set id(id: string) {
    this.#destroySetId.next();
    this.#complaintFacade
      .loadComplaint(id)
      .pipe(takeUntil(this.#destroySetId))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#destroySetId.next();
    this.#destroySetId.complete();
  }
}
