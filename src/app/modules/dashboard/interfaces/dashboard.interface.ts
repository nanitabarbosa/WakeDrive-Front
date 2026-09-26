export type DeviceStatus = 'ACTIVE' | 'OFFLINE';
export type AlertType = 'DROWSINESS' | 'FACE_NOT_DETECTED' | 'DEVICE_OFF' | 'CONNECTION_LOST';
export type AlertLevel = 'HIGH' | 'MEDIUM';

export interface TrendStat {
  total: number;
  /** Variación porcentual frente al periodo anterior (puede ser negativa). */
  variation: number;
}

export interface DashboardStats {
  vehicles: TrendStat;
  activeUsers: TrendStat;
  devices: { total: number; active: number; offline: number };
  alertsToday: TrendStat;
}

export interface DeviceSummary {
  serial: string;
  vehiclePlate: string;
  assignedUser: string;
  status: DeviceStatus;
  /** Fecha ISO. */
  lastConnection: string;
}

export interface AlertSummary {
  id: number;
  /** Fecha y hora ISO. */
  date: string;
  user: string;
  vehiclePlate: string;
  location: string;
  type: AlertType;
  durationSeconds: number;
  level: AlertLevel;
}

export interface DailyAlerts {
  /** Fecha ISO (yyyy-MM-dd). */
  date: string;
  total: number;
}

export interface UserAlertRanking {
  userId: number;
  name: string;
  total: number;
}

/** Rango de fechas del dashboard (yyyy-MM-dd). */
export interface DateRange {
  from: string;
  to: string;
}

export interface DeviceFilters {
  search: string;
  status: DeviceStatus | '';
  limit: number;
}

export interface AlertFilters {
  search: string;
  type: AlertType | '';
  limit: number;
}
