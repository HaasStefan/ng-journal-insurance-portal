import { Routes } from '@angular/router';
import { featureFlagGuard } from '@ng-journal/shared/data-access';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canMatch: [featureFlagGuard('claim-list')],
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-list')).ListComponent,
      },
      {
        path: ':id/details',
        canMatch: [featureFlagGuard('claim-details')],
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-details')).DetailsComponent,
      },
      {
        path: 'create',
        canMatch: [featureFlagGuard('claim-create')],
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-create')).CreateComponent,
      },
    ],
  },
];
