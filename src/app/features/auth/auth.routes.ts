import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((c) => c.Register),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((c) => c.Login),
  },
];
