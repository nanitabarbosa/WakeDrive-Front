import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  AlertSummary,
  DailyAlerts,
  DashboardStats,
  DeviceSummary,
  UserAlertRanking,
} from '../interfaces/dashboard.interface';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Datos de prueba mientras el backend no está disponible.
 * TODO(back): reemplazar cada método por su llamada HTTP.
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  getStats(): Observable<DashboardStats> {
    return of({
      vehicles: { total: 25, variation: 8 },
      activeUsers: { total: 48, variation: 5 },
      devices: { total: 25, active: 22, offline: 3 },
      alertsToday: { total: 12, variation: 20 },
    });
  }

  getDevices(): Observable<DeviceSummary[]> {
    const now = Date.now();
    return of([
      { serial: 'WD-000123', vehiclePlate: 'ABC-123', assignedUser: 'Juan Pérez', status: 'ACTIVE', lastConnection: new Date(now - 2 * MINUTE) },
      { serial: 'WD-000124', vehiclePlate: 'XYZ-456', assignedUser: 'Carlos Ruiz', status: 'ACTIVE', lastConnection: new Date(now - 5 * MINUTE) },
      { serial: 'WD-000125', vehiclePlate: 'KLM-789', assignedUser: 'Ana Torres', status: 'OFFLINE', lastConnection: new Date(now - 3 * HOUR) },
      { serial: 'WD-000126', vehiclePlate: 'DEF-321', assignedUser: 'Luis Gómez', status: 'ACTIVE', lastConnection: new Date(now - 8 * MINUTE) },
      { serial: 'WD-000127', vehiclePlate: 'GHI-654', assignedUser: 'María López', status: 'OFFLINE', lastConnection: new Date(now - DAY) },
    ]);
  }

  getLatestAlerts(): Observable<AlertSummary[]> {
    const now = Date.now();
    return of([
      { id: 1, date: new Date(now - 25 * MINUTE), user: 'Juan Pérez', vehiclePlate: 'ABC-123', location: 'Km 12 vía Bogotá - Tunja', type: 'DROWSINESS', durationSeconds: 8, level: 'HIGH' },
      { id: 2, date: new Date(now - 1.5 * HOUR), user: 'Carlos Ruiz', vehiclePlate: 'XYZ-456', location: 'Autopista Bucaramanga', type: 'DROWSINESS', durationSeconds: 12, level: 'HIGH' },
      { id: 3, date: new Date(now - 14 * HOUR), user: 'Ana Torres', vehiclePlate: 'KLM-789', location: 'Vía Girón', type: 'FACE_NOT_DETECTED', durationSeconds: 6, level: 'MEDIUM' },
      { id: 4, date: new Date(now - 17 * HOUR), user: 'Luis Gómez', vehiclePlate: 'DEF-321', location: 'Sector La Cemento', type: 'DEVICE_OFF', durationSeconds: 15, level: 'HIGH' },
      { id: 5, date: new Date(now - 21 * HOUR), user: 'María López', vehiclePlate: 'GHI-654', location: 'Vía Piedecuesta', type: 'CONNECTION_LOST', durationSeconds: 9, level: 'HIGH' },
    ]);
  }

  getAlertsByDay(days: number): Observable<DailyAlerts[]> {
    const sample = [8, 12, 6, 18, 14, 20, 12];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return of(
      Array.from({ length: days }, (_, i) => ({
        date: new Date(today.getTime() - (days - 1 - i) * DAY),
        total: sample[(i + sample.length - (days % sample.length)) % sample.length],
      })),
    );
  }

  getTopUsers(days: number): Observable<UserAlertRanking[]> {
    const factor = days / 7;
    return of(
      [
        { name: 'Juan Pérez', total: 18 },
        { name: 'Carlos Ruiz', total: 12 },
        { name: 'Ana Torres', total: 8 },
        { name: 'Luis Gómez', total: 5 },
        { name: 'María López', total: 3 },
      ].map(user => ({ ...user, total: Math.round(user.total * factor) })),
    );
  }
}
