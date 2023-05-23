import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNgModules } from '@ng-journal/shared/utils';

@Component({
  selector: 'ng-journal-header',
  standalone: true,
  imports: [CommonModule, ...primeNgModules],
  template: ` <ng-container [ngSwitch]="type">
      <ng-container *ngSwitchCase="'title'">
        <h1
          class="text-2xl flex flex-row justify-content-between align-items-center"
        >
          <ng-container *ngTemplateOutlet="titleInnerContent"></ng-container>
        </h1>
        <hr />
      </ng-container>
      <ng-container *ngSwitchCase="'subtitle'">
        <h2
          class="text-lg flex flex-row justify-content-between align-items-center"
        >
          <ng-container *ngTemplateOutlet="titleInnerContent"></ng-container>
        </h2>
      </ng-container>
    </ng-container>

    <ng-template #titleInnerContent>
      <span>{{ title }}</span>
      <p-button
        *ngIf="showEditButton"
        type="button"
        styleClass="bg-cyan-500 border-none"
        (click)="this.editButtonClicked.emit()"
      >
        <i class="mr-2 fa-solid fa-pencil"></i>
        <span>Edit</span>
      </p-button>
    </ng-template>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() showEditButton = false;
  @Input() type: 'title' | 'subtitle' = 'title';
  @Output() editButtonClicked = new EventEmitter<void>();
}
