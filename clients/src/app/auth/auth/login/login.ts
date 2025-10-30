import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Importamos el servicio
=======
import { FormsModule } from '@angular/forms'; // 👈 ¡IMPORTANTE para [(ngModel)]!
import { AuthService } from '../auth.service'; // 👈 Importa el nuevo servicio

>>>>>>> feature/dashboard

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
<<<<<<< HEAD
=======
  // 2. Inyecta Router en el constructor
  constructor(
    private router: Router,
    private authService: AuthService

  ) { }

  onLoginSuccess() {
    // ... Tu lógica para manejar la respuesta exitosa del backend ...

    // 3. Navega al nuevo dashboard de gimnasios
    this.router.navigate(['/gimnasios']);
  }

>>>>>>> feature/dashboard
  showPassword = false;

  username: string = '';
  password_user: string = '';

<<<<<<< HEAD
  // Inyectamos Router y AuthService
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
=======
>>>>>>> feature/dashboard

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.authenticate(this.username, this.password_user).subscribe(
      (success) => {
        if (success) {
          // REDIRECCIÓN: Navega a /dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Manejo de error de credenciales
          alert('Credenciales incorrectas. Pruebe: test@example.com / 12345');
        }
      },
      (error) => {
        alert('Error de conexión.');
        console.error('Error durante la autenticación:', error);
      }
    );
  }
}


