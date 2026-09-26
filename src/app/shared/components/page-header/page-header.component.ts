import { Component, Input } from '@angular/core';

/**
 * Encabezado de página: título, subtítulo y acciones a la derecha.
 * Uso: <app-page-header title="Usuarios" subtitle="..."> <button>…</button> </app-page-header>
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
}
