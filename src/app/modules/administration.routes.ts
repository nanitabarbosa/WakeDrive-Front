import { Routes } from '@angular/router';

import { MainLayoutComponent } from '../shared/layouts/main-layout/main-layout.component';

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
        path: 'users',
        loadComponent: () => import('./users/pages/user-list/user-list.component').then(m => m.UserListComponent),
      },
      {
        path: 'alerts',
        loadComponent: () => import('./alerts/pages/alert-list/alert-list.component').then(m => m.AlertListComponent),
      },
      {
        path: 'devices',
        loadComponent: () => import('./devices/pages/device-list/device-list.component').then(m => m.DeviceListComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./settings/pages/settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },
];
