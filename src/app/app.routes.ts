import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/administration.routes').then(m => m.ADMINISTRATION_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
