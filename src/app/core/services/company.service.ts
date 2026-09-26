import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Company } from '../interfaces/company.interface';

/** Empresas que puede gestionar el usuario en sesión y la empresa seleccionada. */
@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly _selected = signal<Company | null>(null);
  readonly selected = this._selected.asReadonly();

  constructor(private _http: HttpClient) {}

  // TODO(back): confirmar endpoint. Lista corta para el selector (sin paginar).
  getCompanies(): Observable<Company[]> {
    return this._http.get<Company[]>(`${environment.apiUrl}/companies`).pipe(
      tap(companies => {
        if (!this._selected() && companies.length) this._selected.set(companies[0]);
      }),
    );
  }

  select(company: Company): void {
    this._selected.set(company);
  }
}
