import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Importamos Router para la navegación
import { CommonModule } from '@angular/common'; // Necesario si usas *ngIf o pipes, buena práctica

@Component({
  selector: 'app-usuario-creado',
  standalone: true,
  imports: [RouterModule, CommonModule], // Agregamos CommonModule
  templateUrl: './usuario-creado.html',
  styleUrls: ['./usuario-creado.css']
})
// Implementamos OnInit y OnDestroy para el manejo del ciclo de vida
export class UsuarioCreado implements OnInit, OnDestroy {
  /** Contador visible para el usuario (empieza en 5) */
  countdown: number = 5;
  /** Almacena el ID del temporizador de intervalo para limpiarlo */
  private intervalId: any;

  // Inyección del servicio Router
  constructor(private router: Router) { }

  ngOnInit(): void {
    const REDIRECTION_TIME = 5000; // 5 segundos en milisegundos

    // 1. **Redirección principal:** Navega a la ruta raíz (login) después de 5 segundos.
    setTimeout(() => {
      this.router.navigate(['/']);
    }, REDIRECTION_TIME);

    // 2. **Actualización visual:** Inicia un intervalo para decrementar el contador cada segundo.
    this.intervalId = setInterval(() => {
      this.countdown--;

      // Opcional: Detiene el contador cuando llega a 0
      if (this.countdown <= 0) {
        clearInterval(this.intervalId);
      }
    }, 1000); // 1000 milisegundos = 1 segundo
  }

  /**
   * Limpia el temporizador para evitar fugas de memoria si el usuario navega
   * antes de que se cumplan los 5 segundos.
   */
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

