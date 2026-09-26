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
  lastConnection: Date;
}

export interface AlertSummary {
  id: number;
  date: Date;
  user: string;
  vehiclePlate: string;
  location: string;
  type: AlertType;
  durationSeconds: number;
  level: AlertLevel;
}

export interface DailyAlerts {
  date: Date;
  total: number;
}

export interface UserAlertRanking {
  name: string;
  total: number;
}
