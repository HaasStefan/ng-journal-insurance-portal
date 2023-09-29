import { Routes } from '@angular/router';
import { featureFlagGuard } from '@ng-journal/shared/data-access';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canMatch: [featureFlagGuard('contract-list')],
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-list')).ListComponent,
      },
      {
        path: 'create',
        canMatch: [featureFlagGuard('contract-create')],
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-create')).CreateComponent,
      },
      {
        path: ':id/edit',
        canMatch: [featureFlagGuard('contract-edit')],
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-edit')).EditComponent,
      },
      {
        path: ':id/details',
        canMatch: [featureFlagGuard('contract-details')],
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
