import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { primeNgModules } from '@ng-journal/shared/utils';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [CommonModule, ...primeNgModules],
  template: `

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  readonly #contractFacade = inject(ContractFacadeService);
}
