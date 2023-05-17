import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Create works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateComponent {
  readonly #claimFacade = inject(ClaimFacadeService);
}
