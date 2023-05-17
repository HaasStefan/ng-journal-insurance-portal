import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Create works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly #complaintFacade = inject(ComplaintFacadeService);
}
