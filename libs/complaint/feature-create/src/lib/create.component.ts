import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';
import { ComplaintFormComponent } from '@ng-journal/complaint/ui';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [CommonModule, ComplaintFormComponent],
  template: `<p>Create works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly #complaintFacade = inject(ComplaintFacadeService);
}
