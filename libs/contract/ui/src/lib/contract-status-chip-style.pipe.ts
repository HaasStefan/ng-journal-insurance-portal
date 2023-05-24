import { Pipe, PipeTransform } from '@angular/core';
import { ContractStatusDto } from '@ng-journal/contract/models';
import { ContractStatusChipStyle } from './contract-status-chip.component';

@Pipe({
  name: 'contractStatusChipStyle',
  standalone: true,
})
export class ContractStatusChipStylePipe implements PipeTransform {
  transform(value: ContractStatusDto): ContractStatusChipStyle {
    switch (value) {
      case ContractStatusDto.Active:
        return ContractStatusChipStyle.Active;
      case ContractStatusDto.Inactive:
        return ContractStatusChipStyle.Inactive;
      case ContractStatusDto.Pending:
        return ContractStatusChipStyle.Pending;
      default:
        throw new Error(`Unknown contract status: ${value}`);
    }
  }
}
