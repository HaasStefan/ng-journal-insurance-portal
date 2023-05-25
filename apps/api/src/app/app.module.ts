import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
