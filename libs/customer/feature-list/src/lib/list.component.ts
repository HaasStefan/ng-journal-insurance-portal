import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFacadeService } from '@ng-journal/customer/data-access';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>List works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly #customerFacade = inject(CustomerFacadeService);
}
