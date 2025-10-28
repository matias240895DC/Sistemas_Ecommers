import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // 2. Inyecta Router en el constructor
  constructor(private router: Router) { }

  onLoginSuccess() {
    // ... Tu lógica para manejar la respuesta exitosa del backend ...

    // 3. Navega al nuevo dashboard de gimnasios
    this.router.navigate(['/gimnasios']);
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}


