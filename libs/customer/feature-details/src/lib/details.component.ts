import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFacadeService } from '@ng-journal/customer/data-access';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Details works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DetailsComponent {
  readonly #customerFacade = inject(CustomerFacadeService);
}
