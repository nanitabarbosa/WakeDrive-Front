import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Company } from '../../../core/interfaces/company.interface';
import { SessionUser } from '../../../core/interfaces/session-user.interface';
import { AuthService } from '../../../core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatMenuModule],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  readonly collapsed = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Usuarios', icon: 'group', route: '/users' },
    { label: 'Alertas', icon: 'notifications', route: '/alerts' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },
  ];

  // TODO(back): empresas y usuario vendrán de la sesión / API.
  readonly companies: Company[] = [
    { id: 1, name: 'Transportes ABC' },
    { id: 2, name: 'Logística del Norte' },
    { id: 3, name: 'Expreso Santander' },
  ];
  readonly selectedCompany = signal<Company>(this.companies[0]);
  readonly user: SessionUser = { name: 'Juan Pérez', role: 'Administrador', initials: 'JP' };

  constructor(private _authService: AuthService) {}

  toggleMenu(): void {
    this.collapsed.update(value => !value);
  }

  selectCompany(company: Company): void {
    this.selectedCompany.set(company);
  }

  logout(): void {
    this._authService.logout();
  }
}
