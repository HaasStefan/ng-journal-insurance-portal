import { Type } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

export const primeNgModules: Type<unknown>[] = [
  ButtonModule,
  TableModule,
  InputTextModule,
  CalendarModule,
  DropdownModule,
];
