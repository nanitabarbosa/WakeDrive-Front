import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { TableCellContext, TableColumn } from './interfaces/table.interface';

/**
 * Tabla reutilizable dentro de una card.
 *
 * - `columns`: columnas a mostrar (se pinta `row[column.key]`).
 * - `customColumns`: columnas que se pintan con el `<ng-template #cellTemplate let-row let-column="column">`.
 * - Filtros / botones del encabezado: contenido proyectado con el atributo `table-actions`.
 * - Encabezado sin título (solo filtros): `[showToolbar]="true"`.
 * - Selección con checkboxes (`selectable`): emite las filas marcadas en `(selectionChange)`.
 * - Paginación opcional (`paginated`): la página se controla desde el padre con `page` / `(pageChange)`.
 */
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgTemplateOutlet, MatIconModule],
  templateUrl: './table.component.html',
})
export class TableComponent<T> {
  @Input() title = '';
  @Input() icon = '';
  @Input() iconClass = '';
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() customColumns: string[] = [];
  @Input() emptyMessage = 'No hay registros para mostrar.';
  @Input() showToolbar = false;

  @Input() selectable = false;
  @Output() selectionChange = new EventEmitter<T[]>();
  readonly selected = new Set<T>();

  @Input() paginated = false;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  @ContentChild('cellTemplate') cellTemplate?: TemplateRef<TableCellContext<T>>;

  private _data: T[] = [];

  @Input()
  set data(rows: T[]) {
    this._data = rows ?? [];
    // Al cambiar de página o de filtro se limpia la selección.
    if (this.selected.size) {
      this.selected.clear();
      this.selectionChange.emit([]);
    }
  }
  get data(): T[] {
    return this._data;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  get rangeStart(): number {
    return this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.page * this.pageSize, this.total);
  }

  /** Máximo 5 botones de página alrededor de la actual. */
  get visiblePages(): number[] {
    const start = Math.max(1, Math.min(this.page - 2, this.totalPages - 4));
    const end = Math.min(this.totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  get allSelected(): boolean {
    return this._data.length > 0 && this._data.every(row => this.selected.has(row));
  }

  isCustom(column: TableColumn): boolean {
    return this.customColumns.includes(column.key);
  }

  value(row: T, column: TableColumn): unknown {
    return (row as Record<string, unknown>)[column.key];
  }

  toggleRow(row: T): void {
    if (this.selected.has(row)) this.selected.delete(row);
    else this.selected.add(row);
    this.selectionChange.emit([...this.selected]);
  }

  toggleAll(): void {
    if (this.allSelected) this.selected.clear();
    else this._data.forEach(row => this.selected.add(row));
    this.selectionChange.emit([...this.selected]);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.pageChange.emit(page);
  }
}
