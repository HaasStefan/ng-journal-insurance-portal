import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatus } from '@ng-journal/contract/models';
import { ContractStatusChipStyle } from './contract-status-chip.component';

@Pipe({
  name: 'contractStatusChipStyle',
  standalone: true,
})
export class ContractStatusChipStylePipe implements PipeTransform {
  transform(value: ContractStatus): ContractStatusChipStyle {
    switch (value) {
      case ContractStatus.Active:
        return ContractStatusChipStyle.Active;
      case ContractStatus.Inactive:
        return ContractStatusChipStyle.Inactive;
      case ContractStatus.Pending:
        return ContractStatusChipStyle.Pending;
      default:
        throw new Error(`Unknown contract status: ${value}`);
    }
  }
}
