import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-list')).ListComponent,
      },
      {
        path: 'create',
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-create')).CreateComponent,
      },
      {
        path: 'edit/:id',
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-edit')).EditComponent,
      },
      {
        path: ':id',
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-details'))
            .DetailsComponent,
      },
    ],
  },
];
