import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';

@Component({
  selector: 'ng-journal-edit',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Edit works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
