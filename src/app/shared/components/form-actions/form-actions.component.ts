import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Botones Cancelar / Guardar de los formularios.
 * Uso: <app-form-actions saveLabel="Guardar usuario" [disabled]="form.invalid" (save)="save()" (dismiss)="close()" />
 */
@Component({
  selector: 'app-form-actions',
  standalone: true,
  templateUrl: './form-actions.component.html',
})
export class FormActionsComponent {
  @Input() saveLabel = 'Guardar';
  @Input() cancelLabel = 'Cancelar';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() save = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();
}
