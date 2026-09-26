import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  {
    path: 'request-access',
    loadComponent: () => import('./pages/request-access/request-access.component').then(m => m.RequestAccessComponent),
  },
];
