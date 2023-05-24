import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintFacadeService } from '@ng-journal/complaint/data-access';
import { RouterLink } from '@angular/router';
import { primeNgModules } from '@ng-journal/shared/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ng-journal-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ...primeNgModules],
  template: `<p-table [value]="complaints()" [rowHover]="true">
    <ng-template pTemplate="header">
      <tr>
        <th>Type</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Description</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-complaint>
      <tr [routerLink]="['/', 'complaint', complaint.id, 'details']">
        <td>{{ complaint.type }}</td>
        <td>{{ complaint.customer?.label }}</td>
        <td>{{ complaint.date | date }}</td>
        <td>{{ complaint.description }}</td>
      </tr>
    </ng-template>
  </p-table>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  readonly #complaintFacade = inject(ComplaintFacadeService);
  readonly complaints = this.#complaintFacade.complaints;
  readonly loadComplaints = this.#complaintFacade
    .loadComplaints()
    .pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.loadComplaints.subscribe();
  }
}
