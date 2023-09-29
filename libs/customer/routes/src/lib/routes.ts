import { Routes } from '@angular/router';
import { featureFlagGuard } from '@ng-journal/shared/data-access';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canMatch: [featureFlagGuard('customer-list')],
        loadComponent: async () =>
          (await import('@ng-journal/customer/feature-list')).ListComponent,
      },
      {
        path: ':id/details',
        canMatch: [featureFlagGuard('customer-details')],
        loadComponent: async () =>
          (await import('@ng-journal/customer/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
