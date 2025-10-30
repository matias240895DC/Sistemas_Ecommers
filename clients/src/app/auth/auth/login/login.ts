import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // Importamos el servicio

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  showPassword = false;

  username: string = '';
  password_user: string = '';

  // Inyectamos Router y AuthService
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

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


