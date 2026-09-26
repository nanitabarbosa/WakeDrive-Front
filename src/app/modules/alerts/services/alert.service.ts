import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Page } from '../../../core/interfaces/page.interface';
import { buildPageParams } from '../../../core/utils/http-params';
import { Alert, AlertFilters, FilterOption } from '../interfaces/alert.interface';

// TODO(back): confirmar rutas y contratos con el backend.
const ENDPOINT = `${environment.apiUrl}/alerts`;

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private _http: HttpClient) {}

  /** GET /alerts?page&size&from&to&userId&vehicleId&type&level&location — paginado y filtrado en el back. */
  getAlerts(filters: AlertFilters): Observable<Page<Alert>> {
    return this._http.get<Page<Alert>>(ENDPOINT, { params: buildPageParams({ ...filters }) });
  }

  // Opciones de los filtros (listas cortas, sin paginar).
  getUserOptions(): Observable<FilterOption[]> {
    return this._http.get<FilterOption[]>(`${environment.apiUrl}/users/options`);
  }

  getVehicleOptions(): Observable<FilterOption[]> {
    return this._http.get<FilterOption[]>(`${environment.apiUrl}/vehicles/options`);
  }
}
