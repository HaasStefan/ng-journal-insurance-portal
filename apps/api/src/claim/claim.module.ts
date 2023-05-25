import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';

@Module({
  providers: [ClaimService],
  controllers: [ClaimController],
})
export class ClaimModule {}
