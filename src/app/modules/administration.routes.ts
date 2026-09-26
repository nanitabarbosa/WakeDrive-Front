import { Routes } from '@angular/router';

import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';

/** Todas las rutas del panel de administración (dentro del layout con menú lateral). */
export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'devices',
        loadComponent: () => import('./devices/pages/device-list/device-list.component').then(m => m.DeviceListComponent),
      },
    ],
  },
];
