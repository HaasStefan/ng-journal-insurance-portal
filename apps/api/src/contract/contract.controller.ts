import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Contract } from './contract.interface';
import { ContractService } from './contract.service';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get()
  async getContracts() {
    return await firstValueFrom(this.contractService.getAll());
  }

  @Get(':id')
  async getContract(@Param('id') id: string) {
    return await firstValueFrom(this.contractService.get(id));
  }

  @Put()
  updateContract(@Body() contract: Contract) {
    this.contractService.update(contract);
    return contract;
  }

  @Post()
  createContract(@Body() contract: Contract) {
    this.contractService.add(contract);
    return contract;
  }
}
