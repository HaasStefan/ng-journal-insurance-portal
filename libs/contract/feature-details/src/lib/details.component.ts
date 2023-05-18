import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractFacadeService } from '@ng-journal/contract/data-access';
import { HeaderComponent } from '@ng-journal/shared/ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ng-journal-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <ng-journal-header
      title="Contract Details"
      [showEditButton]="true"
      (editButtonClicked)="this.onEditButtonClicked()"
    />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  readonly #contractFacade = inject(ContractFacadeService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  @Input() id!: string;

  onEditButtonClicked(): void {
    this.#router.navigate(['edit', this.id], {
      relativeTo: this.#route.parent,
    });
  }
}
