import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNgModules } from '@ng-journal/shared/utils';

@Component({
  selector: 'ng-journal-header',
  standalone: true,
  imports: [CommonModule, ...primeNgModules],
  template: `<h1 class="text-2xl flex flex-row justify-content-between align-items-center">
    <span>{{ title }}</span>
    <p-button *ngIf="showEditButton" type="button" styleClass="bg-cyan-500 border-none" (click)="this.editButtonClicked.emit()">
      <i class="mr-2 fa-solid fa-pencil"></i>
      <span>Edit</span>
    </p-button>
  </h1>
  <hr />`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({required: true}) title!: string;
  @Input() showEditButton = false;
  @Output() editButtonClicked = new EventEmitter<void>();
}
