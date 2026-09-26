import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';

import { AuthResponse, LoginRequest } from '../interfaces/auth.interface';

const TOKEN_KEY = 'wd_token';
const ROLES_KEY = 'wd_roles';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly _roles = signal<string[]>(JSON.parse(localStorage.getItem(ROLES_KEY) ?? '[]'));

  readonly token = this._token.asReadonly();
  readonly roles = this._roles.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token());

  constructor(private _router: Router) {}

  // TODO(back): reemplazar por POST `${environment.apiUrl}/auth/login` cuando el backend esté listo.
  login(credentials: LoginRequest): Observable<AuthResponse> {
    const mock: AuthResponse = { token: `mock-token-${credentials.email}`, roles: ['SUPER_ADMIN'] };
    return of(mock).pipe(tap(res => this.setSession(res)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLES_KEY);
    this._token.set(null);
    this._roles.set([]);
    this._router.navigate(['/auth/login']);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this._roles().includes(role));
  }

  private setSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(ROLES_KEY, JSON.stringify(res.roles));
    this._token.set(res.token);
    this._roles.set(res.roles);
  }
}
