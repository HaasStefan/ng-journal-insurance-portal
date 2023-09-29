import { Routes } from '@angular/router';
import { featureFlagGuard } from '@ng-journal/shared/data-access';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canMatch: [featureFlagGuard('complaint-list')],
        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-list')).ListComponent,
      },
      {
        path: 'create',
        canMatch: [featureFlagGuard('complaint-create')],

        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-create'))
            .CreateComponent,
      },
      {
        path: ':id/details',
        canMatch: [featureFlagGuard('complaint-details')],
        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
