import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>List works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
