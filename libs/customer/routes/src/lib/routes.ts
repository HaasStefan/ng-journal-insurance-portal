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
        path: ':id',
        loadComponent: async () =>
          (await import('@ng-journal/customer/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
