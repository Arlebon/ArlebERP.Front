import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'error',
    loadChildren: () => import('./features/error/error.routes').then((r) => r.routes),
  },
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((c) => c.Home),
  },
];
