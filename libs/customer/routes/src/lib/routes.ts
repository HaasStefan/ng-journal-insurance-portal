import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: async () =>
          (await import('@ng-journal/customer/feature-list')).ListComponent,
      },
      {
        path: ':id/details',
        loadComponent: async () =>
          (await import('@ng-journal/customer/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
