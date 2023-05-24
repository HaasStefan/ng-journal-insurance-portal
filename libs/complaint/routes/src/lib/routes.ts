import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-list')).ListComponent,
      },
      {
        path: 'create',
        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-create'))
            .CreateComponent,
      },
      {
        path: ':id/details',
        loadComponent: async () =>
          (await import('@ng-journal/complaint/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
