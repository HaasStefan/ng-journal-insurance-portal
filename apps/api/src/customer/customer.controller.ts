import { Controller, Get, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers() {
    return await firstValueFrom(this.customerService.getAll());
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string) {
    return await firstValueFrom(this.customerService.get(id));
  }
}
