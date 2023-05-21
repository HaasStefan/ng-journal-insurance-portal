import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { primeNgModules } from '@ng-journal/shared/utils';

export const buttonType = ['button', 'submit', 'reset'];
export const buttonStyle = [
  'primary',
  'success',
  'secondary',
  'info',
  'warning',
  'help',
  'danger',
];

export type ButtonType = (typeof buttonType)[number];
export type ButtonStyle = (typeof buttonStyle)[number];

@Component({
  selector: 'ng-journal-button',
  standalone: true,
  imports: [CommonModule, ...primeNgModules],
  template: `
    <p-button
      [label]="label"
      [type]="type"
      [loading]="loading()"
      [disabled]="disabled"
      [style]="{width}"
      [styleClass]="'p-button-' + style"
      (onClick)="clickEvent.emit()"
    />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() style: ButtonStyle = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() width?: string;
  @Input() disabled = false;
  @Output() clickEvent = new EventEmitter<void>();
  loading = signal(false);
}
