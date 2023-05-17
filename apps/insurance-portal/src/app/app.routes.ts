import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contract',
  },
  {
    path: 'contract',
    loadChildren: async () =>
      (await import('@ng-journal/contract/routes')).routes,
  },
  {
    path: 'claim',
    loadChildren: async () => (await import('@ng-journal/claim/routes')).routes,
  },
  {
    path: 'complaint',
    loadChildren: async () =>
      (await import('@ng-journal/complaint/routes')).routes,
  },
  {
    path: 'customer',
    loadChildren: async () =>
      (await import('@ng-journal/customer/routes')).routes,
  },
];
