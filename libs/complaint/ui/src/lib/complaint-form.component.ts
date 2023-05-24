import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-journal-complaint-form',
  standalone: true,
  imports: [CommonModule],
  template: `<p>complaint-form works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplaintFormComponent {
  // @Input({ required: true }) form!: ComplaintForm;
}
