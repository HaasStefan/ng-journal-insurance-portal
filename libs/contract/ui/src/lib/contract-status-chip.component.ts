import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNgModules } from '@ng-journal/shared/utils';

export enum ContractStatusChipStyle {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}

@Component({
  selector: 'ng-journal-contract-status-chip',
  standalone: true,
  imports: [CommonModule, ...primeNgModules],
  template: `<p-chip [label]="label" [class]="style"></p-chip> `,
  styles: [
    `
      ::ng-deep .active .p-chip {
        background-color: green;
      }
      ::ng-deep .inactive .p-chip {
        background-color: red;
      }
      ::ng-deep .pending .p-chip {
        background-color: orange;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractStatusChipComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) style!: ContractStatusChipStyle;
}
