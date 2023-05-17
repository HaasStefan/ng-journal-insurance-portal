import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';

@Component({
  selector: 'ng-journal-edit',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Edit works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditComponent {
  readonly #claimFacade = inject(ClaimFacadeService);
}
