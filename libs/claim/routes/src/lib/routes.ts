import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-list')).ListComponent,
      },
      {
        path: ':id/details',
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-details')).DetailsComponent,
      },
      {
        path: 'create',
        loadComponent: async () =>
          (await import('@ng-journal/claim/feature-create')).CreateComponent,
      },
    ],
  },
];
