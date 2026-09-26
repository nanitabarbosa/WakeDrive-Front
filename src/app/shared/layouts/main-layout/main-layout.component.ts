import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Company } from '../../../core/interfaces/company.interface';
import { AuthService } from '../../../core/services/auth.service';
import { CompanyService } from '../../../core/services/company.service';

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
export class MainLayoutComponent implements OnInit {
  readonly collapsed = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Usuarios', icon: 'group', route: '/users' },
    { label: 'Alertas', icon: 'notifications', route: '/alerts' },
    { label: 'Configuración', icon: 'settings', route: '/settings' },
  ];

  readonly companies = signal<Company[]>([]);

  constructor(
    private _authService: AuthService,
    private _companyService: CompanyService,
  ) {}

  get user() {
    return this._authService.user();
  }

  get selectedCompany(): Company | null {
    return this._companyService.selected();
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this._companyService.getCompanies().subscribe({
      next: companies => this.companies.set(companies),
      error: () => this.companies.set([]),
    });
  }

  toggleMenu(): void {
    this.collapsed.update(value => !value);
  }

  selectCompany(company: Company): void {
    this._companyService.select(company);
  }

  initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  logout(): void {
    this._authService.logout();
  }
}
