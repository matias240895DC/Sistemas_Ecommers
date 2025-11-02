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
  showPassword = false;

  username: string = '';
  password_user: string = '';

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
          alert('¡Acceso denegado! Verifique las credenciales ingresadas.');
        }
      },
      (error) => {
        alert('Error de conexión.');
        console.error('Error durante la autenticación:', error);
      }
    );
  }
}


