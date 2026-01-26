import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '500',
    loadComponent: () => import('./pages/server-error/server-error').then((c) => c.ServerError),
  },
];
