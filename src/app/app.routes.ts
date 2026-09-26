import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./modules/administration.routes').then(m => m.ADMINISTRATION_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
