import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimFacadeService } from '@ng-journal/claim/data-access';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Details works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  readonly #claimFacade = inject(ClaimFacadeService);
}
