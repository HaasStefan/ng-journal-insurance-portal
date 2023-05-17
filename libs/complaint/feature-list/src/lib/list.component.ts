import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule],
  template: `<p>List works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly #complaintFacade = inject(ComplaintFacadeService);
}
