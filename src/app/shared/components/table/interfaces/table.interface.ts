export interface TableColumn {
  /** Propiedad de la fila que se muestra en la columna. */
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

/** Contexto que recibe el `#cellTemplate` para pintar columnas personalizadas. */
export interface TableCellContext<T> {
  $implicit: T;
  column: TableColumn;
  index: number;
}
