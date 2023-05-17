import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Create works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
