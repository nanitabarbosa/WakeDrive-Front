import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'request-access' },
  {
    path: 'request-access',
    loadComponent: () => import('./pages/request-access/request-access.component').then(m => m.RequestAccessComponent),
  },
];
