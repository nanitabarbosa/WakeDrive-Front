export type AlertType = 'DROWSINESS' | 'FACE_NOT_DETECTED' | 'DEVICE_OFF' | 'CONNECTION_LOST';
export type AlertLevel = 'HIGH' | 'MEDIUM';

export const ALERT_TYPE_LABELS: Record<string, string> = {
  DROWSINESS: 'Somnolencia detectada',
  FACE_NOT_DETECTED: 'Rostro no detectado',
  DEVICE_OFF: 'Dispositivo apagado',
  CONNECTION_LOST: 'Pérdida de conexión',
};

export const ALERT_TYPE_ICONS: Record<string, string> = {
  DROWSINESS: 'hotel',
  FACE_NOT_DETECTED: 'person',
  DEVICE_OFF: 'power_settings_new',
  CONNECTION_LOST: 'wifi_off',
};

export const ALERT_LEVEL_LABELS: Record<string, string> = {
  HIGH: 'Alta',
  MEDIUM: 'Media',
};

export interface Alert {
  id: number;
  /** Fecha y hora ISO. */
  date: string;
  userId: number;
  userName: string;
  vehicleId: number;
  vehiclePlate: string;
  deviceSerial: string;
  location: string;
  type: AlertType;
  durationSeconds: number;
  level: AlertLevel;
}

export interface AlertFilters {
  /** yyyy-MM-dd */
  from: string;
  /** yyyy-MM-dd */
  to: string;
  userId: number | '';
  vehicleId: number | '';
  type: AlertType | '';
  level: AlertLevel | '';
  location: string;
  /** Página en la UI (empieza en 1). */
  page: number;
  size: number;
}

/** Opción de los selects de filtro (usuarios, vehículos). */
export interface FilterOption {
  id: number;
  label: string;
}
