import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Claim } from './claim.interface';
import { ClaimService } from './claim.service';

@Controller('claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get()
  async getClaims() {
    return await firstValueFrom(this.claimService.getAll());
  }

  @Get(':id')
  async getClaim(@Param('id') id: string) {
    return await firstValueFrom(this.claimService.get(id));
  }

  @Post()
  createClaim(@Body() claim: Claim) {
    this.claimService.add(claim);
    return claim;
  }
}
