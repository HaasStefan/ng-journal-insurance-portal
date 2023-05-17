import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>List works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent {
  readonly #claimFacade = inject(ClaimFacadeService);
}
