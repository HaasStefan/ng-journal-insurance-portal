import { faker } from '@faker-js/faker';
import { Module } from '@nestjs/common';
import { ComplaintModule } from '../complaint/complaint.module';
import { ContractModule } from '../contract/contract.module';
import { CustomerModule } from '../customer/customer.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CustomerModule, ContractModule, ComplaintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
