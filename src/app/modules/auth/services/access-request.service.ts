import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AccessRequestPayload, City } from '../interfaces/access-request.interface';

@Injectable({ providedIn: 'root' })
export class AccessRequestService {
  constructor(private _http: HttpClient) {}

  getCities(): Observable<City[]> {
    // TODO(back): quitar las ciudades simuladas y descomentar la llamada real cuando el back esté listo.
    // return this._http.get<City[]>(`${environment.apiUrl}/cities`);
    const mock: City[] = [
      { id: 1, name: 'Bogotá' },
      { id: 2, name: 'Medellín' },
      { id: 3, name: 'Cali' },
      { id: 4, name: 'Barranquilla' },
      { id: 5, name: 'Cartagena' },
      { id: 6, name: 'Bucaramanga' },
      { id: 7, name: 'Cúcuta' },
      { id: 8, name: 'Ocaña' },
      { id: 9, name: 'Pereira' },
      { id: 10, name: 'Santa Marta' },
    ];
    return of(mock);
  }

  createRequest(payload: AccessRequestPayload): Observable<void> {
    // TODO(back): quitar el envío simulado y descomentar la llamada real cuando el back esté listo.
    // return this._http.post<void>(`${environment.apiUrl}/access-requests`, payload);
    return of(undefined).pipe(delay(800));
  }
}
