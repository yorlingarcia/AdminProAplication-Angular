import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() label: string = 'Button'; // Texto del botón
  @Input() bgColor: string = 'bg-blue-500'; // Color de fondo del botón (por defecto azul)
  @Input() textColor: string = 'text-white'; // Color del texto (por defecto blanco)
  @Input() fontSize: string = 'text-base'; // Tamaño de letra (por defecto normal)
  @Input() padding: string = 'py-2 px-4'; // Padding por defecto

  // Otras posibles propiedades que se pueden agregar
  @Input() disabled: boolean = false; // Deshabilitar botón
}
