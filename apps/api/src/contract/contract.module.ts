import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';

@Module({
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
