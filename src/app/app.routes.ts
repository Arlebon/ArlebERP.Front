import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((c) => c.Home),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.routes),
  },
];
