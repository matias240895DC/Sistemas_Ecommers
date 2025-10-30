// src/app/auth/login/login.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 ¡IMPORTANTE para [(ngModel)]!
import { AuthService } from '../auth.service'; // 👈 Importa el nuevo servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // ✅ Importaciones correctas para standalone
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  showPassword = false;

  // Propiedades para enlazar con el formulario (usa ngModel en el HTML)
  username: string = '';
  password_user: string = '';

  // 1. Inyectar Router y AuthService en el constructor
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 2. Lógica del login
  login() {
    // Llama al servicio de autenticación y se suscribe a su Observable
    this.authService.authenticate(this.username, this.password_user).subscribe(
      (success) => {
        if (success) {
          // 3. ¡Navegación exitosa al dashboard!
          this.router.navigate(['/dashboard']);
        } else {
          // Lógica para mostrar error de credenciales incorrectas
          alert('Usuario o contraseña incorrectos.');
        }
      },
      (error) => {
        // Manejo de errores de conexión o del servidor (si usaras HttpClient real)
        alert('Error de conexión al servidor.');
        console.error('Error durante la autenticación:', error);
      }
    );
  }
}


