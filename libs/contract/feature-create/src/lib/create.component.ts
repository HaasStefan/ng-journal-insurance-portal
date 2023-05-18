import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { HeaderComponent } from '@ng-journal/shared/ui';

@Component({
  selector: 'ng-journal-create',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
      <ng-journal-header
      title="Contract Create"
    />`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
