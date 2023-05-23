import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFacadeService } from '@ng-journal/customer/data-access';
import { CardComponent, HeaderComponent } from '@ng-journal/shared/ui';
import { primeNgModules } from '@ng-journal/shared/utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent, ...primeNgModules],
  template: ` <ng-journal-header title="Customer Details" />

    <ng-container *ngIf="customer() as customer">
      <ng-journal-card additionalClasses="grid">
        <div class="col-3 font-bold">First name:</div>
        <div class="col-3">
          {{ customer.firstName }}
        </div>
        <div class="col-3 font-bold">Email:</div>
        <div class="col-3">
          {{ customer.email }}
        </div>
        <div class="col-3 font-bold">Last name:</div>
        <div class="col-3">
          {{ customer.lastName }}
        </div>
        <div class="col-3 font-bold">Phone:</div>
        <div class="col-3">
          {{ customer.phone }}
        </div>

        <div class="col-12 pb-0">
          <ng-journal-header title="Address" type="subtitle" />
        </div>

        <div class="col-3 font-bold">Street:</div>
        <div class="col-3">
          {{ customer.address.street }}
        </div>
        <div class="col-3 font-bold">City:</div>
        <div class="col-3">
          {{ customer.address.city }}
        </div>
        <div class="col-3 font-bold">State:</div>
        <div class="col-3">
          {{ customer.address.state }}
        </div>
        <div class="col-3 font-bold">Zip:</div>
        <div class="col-3">
          {{ customer.address.zip }}
        </div>
      </ng-journal-card></ng-container
    >`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnDestroy {
  readonly #customerFacade = inject(CustomerFacadeService);
  readonly customer = this.#customerFacade.selectedCustomer;
  readonly #destroySetId = new Subject<void>();
  @Input() set id(id: string) {
    this.#destroySetId.next();
    this.#customerFacade
      .loadCustomer(id)
      .pipe(takeUntil(this.#destroySetId))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#destroySetId.next();
    this.#destroySetId.complete();
  }
}
