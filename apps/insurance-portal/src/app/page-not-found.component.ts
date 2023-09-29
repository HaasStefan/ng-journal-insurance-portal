import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-journal-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Page Not Found</h1>
    <p>Sorry, but the page you were trying to view does not exist.</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
