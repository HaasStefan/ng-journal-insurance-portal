import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { HeaderComponent } from '@ng-journal/shared/ui';

@Component({
  selector: 'ng-journal-edit',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
      <ng-journal-header
      title="Contract Edit"
    />`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
