import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ContractFacadeService } from '@ng-journal/contract/data-access';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        resolve: {
          list: async () => inject(ContractFacadeService).loadAll()
        },
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-list')).ListComponent,
      },
      {
        path: 'create',
        loadComponent: async () =>
          (await import('@ng-journal/contract/feature-create')).CreateComponent,
      },
      {
        path: 'edit',
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
