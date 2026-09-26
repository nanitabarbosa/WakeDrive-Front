import { Component, OnInit, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableColumn } from '../../../../shared/components/table/interfaces/table.interface';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import {
  AlertSummary,
  AlertType,
  DailyAlerts,
  DashboardStats,
  DeviceStatus,
  DeviceSummary,
  UserAlertRanking,
} from '../../interfaces/dashboard.interface';
import { DashboardService } from '../../services/dashboard.service';

interface DateRangePreset {
  label: string;
  days: number;
}

const DAY = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink, MatIconModule, MatMenuModule, TimeAgoPipe, PageHeaderComponent, TableComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  readonly deviceColumns: TableColumn[] = [
    { key: 'serial', label: 'Serial' },
    { key: 'vehiclePlate', label: 'Vehículo' },
    { key: 'assignedUser', label: 'Usuario asignado' },
    { key: 'status', label: 'Estado' },
    { key: 'lastConnection', label: 'Última conexión' },
  ];
  readonly alertColumns: TableColumn[] = [
    { key: 'date', label: 'Fecha' },
    { key: 'time', label: 'Hora' },
    { key: 'user', label: 'Usuario' },
    { key: 'vehiclePlate', label: 'Vehículo' },
    { key: 'location', label: 'Ubicación' },
    { key: 'type', label: 'Tipo de alerta' },
    { key: 'durationSeconds', label: 'Duración' },
    { key: 'level', label: 'Nivel' },
  ];

  readonly deviceStatusLabels: Record<string, string> = {
    ACTIVE: 'Activo',
    OFFLINE: 'Sin conexión',
  };
  readonly alertTypeLabels: Record<string, string> = {
    DROWSINESS: 'Somnolencia detectada',
    FACE_NOT_DETECTED: 'Rostro no detectado',
    DEVICE_OFF: 'Dispositivo apagado',
    CONNECTION_LOST: 'Pérdida de conexión',
  };
  readonly alertLevelLabels: Record<string, string> = {
    HIGH: 'Alta',
    MEDIUM: 'Media',
  };
  readonly rangePresets: DateRangePreset[] = [
    { label: 'Hoy', days: 1 },
    { label: 'Últimos 4 días', days: 4 },
    { label: 'Últimos 7 días', days: 7 },
    { label: 'Últimos 30 días', days: 30 },
  ];
  readonly periodOptions = [7, 14, 30];
  readonly avatarColors = ['#2f6fed', '#16a34a', '#f59e0b', '#7c5cf5', '#ec4899'];

  readonly stats = signal<DashboardStats | null>(null);
  readonly devices = signal<DeviceSummary[]>([]);
  readonly alerts = signal<AlertSummary[]>([]);
  readonly alertsByDay = signal<DailyAlerts[]>([]);
  readonly topUsers = signal<UserAlertRanking[]>([]);

  readonly dateRange = signal({ start: new Date(), end: new Date() });
  readonly deviceSearch = signal('');
  readonly deviceStatus = signal<DeviceStatus | ''>('');
  readonly alertSearch = signal('');
  readonly alertType = signal<AlertType | ''>('');
  readonly chartDays = signal(7);
  readonly rankingDays = signal(7);

  // TODO(back): cuando exista el API, búsqueda y filtros se envían como query params.
  readonly filteredDevices = computed(() => {
    const term = this.deviceSearch().trim().toLowerCase();
    const status = this.deviceStatus();
    return this.devices().filter(
      device =>
        (!status || device.status === status) &&
        (!term || [device.serial, device.vehiclePlate, device.assignedUser].some(v => v.toLowerCase().includes(term))),
    );
  });

  readonly filteredAlerts = computed(() => {
    const term = this.alertSearch().trim().toLowerCase();
    const type = this.alertType();
    return this.alerts().filter(
      alert =>
        (!type || alert.type === type) &&
        (!term || [alert.user, alert.vehiclePlate, alert.location].some(v => v.toLowerCase().includes(term))),
    );
  });

  /** Tope del eje Y: el máximo redondeado hacia arriba al múltiplo de 5. */
  readonly chartMax = computed(() => Math.max(5, Math.ceil(Math.max(0, ...this.alertsByDay().map(d => d.total)) / 5) * 5));
  readonly chartTicks = computed(() => Array.from({ length: this.chartMax() / 5 + 1 }, (_, i) => i * 5));
  readonly rankingMax = computed(() => Math.max(1, ...this.topUsers().map(u => u.total)));

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.setDateRange(this.rangePresets[1]);
  }

  setDateRange(preset: DateRangePreset): void {
    const end = new Date();
    this.dateRange.set({ start: new Date(end.getTime() - (preset.days - 1) * DAY), end });
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loadStats();
    this.loadDevices();
    this.loadAlerts();
    this.loadAlertsByDay();
    this.loadTopUsers();
  }

  loadStats(): void {
    this._dashboardService.getStats().subscribe(stats => this.stats.set(stats));
  }

  loadDevices(): void {
    this._dashboardService.getDevices().subscribe(devices => this.devices.set(devices));
  }

  loadAlerts(): void {
    this._dashboardService.getLatestAlerts().subscribe(alerts => this.alerts.set(alerts));
  }

  loadAlertsByDay(): void {
    this._dashboardService.getAlertsByDay(this.chartDays()).subscribe(data => this.alertsByDay.set(data));
  }

  loadTopUsers(): void {
    this._dashboardService.getTopUsers(this.rankingDays()).subscribe(users => this.topUsers.set(users));
  }

  onChartDaysChange(days: string): void {
    this.chartDays.set(Number(days));
    this.loadAlertsByDay();
  }

  onRankingDaysChange(days: string): void {
    this.rankingDays.set(Number(days));
    this.loadTopUsers();
  }

  initials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
