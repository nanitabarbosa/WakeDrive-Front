/** Vínculo conductor ↔ vehículo ↔ dispositivo. */
export interface Vinculation {
  id: number;
  userId: number;
  userName: string;
  vehicleId: number;
  vehiclePlate: string;
  deviceSerial: string;
  linkedAt: string;
}

export interface VinculationPayload {
  userId: number;
  vehicleId: number;
  deviceSerial: string;
}

export interface VinculationFilters {
  search: string;
  /** Página en la UI (empieza en 1). */
  page: number;
  size: number;
}

/** Opción para los selects del formulario de vinculación. */
export interface SelectOption {
  id: number;
  label: string;
}
