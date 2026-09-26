import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/**
 * Panel lateral derecho que se superpone al contenido.
 * Cuerpo: contenido proyectado. Pie: contenido con el atributo `drawer-footer`.
 * Se cierra con la X, clic en el fondo o Esc (emite `closed`; el padre pone `open` en false).
 */
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Input() open = false;
  @Input({ required: true }) title = '';
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
