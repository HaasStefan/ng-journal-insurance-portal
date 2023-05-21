import { Type } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';

export const primeNgModules: Type<unknown>[] = [
  ButtonModule,
  TableModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
  ChipModule,
  ToastModule,
];
