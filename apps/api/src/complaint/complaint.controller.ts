import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Complaint } from './complaint.interface';
import { ComplaintService } from './complaint.service';

@Controller('complaints')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Get()
  async getComplaints() {
    return await firstValueFrom(this.complaintService.getAll());
  }

  @Get(':id')
  async getComplaint(@Param('id') id: string) {
    return await firstValueFrom(this.complaintService.get(id));
  }

  @Post()
  createComplaint(@Body() complaint: Complaint) {
    this.complaintService.add(complaint);
    return complaint;
  }
}
