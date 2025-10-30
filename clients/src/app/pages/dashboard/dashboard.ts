import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Asumo que tienes el AuthService en esta ruta
import { AuthService } from '../../auth/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  // Inyección de servicios
  private router = inject(Router);
  private authService = inject(AuthService);

  // --- VARIABLES DE CONTROL DE VISTA ---
  // El sidebar estará abierto por defecto para escritorio (desktop)
  isSidebarOpen: boolean = true;
  // Controla el menú desplegable de usuario en el header
  isUserDropdownOpen: boolean = false;
  // ------------------------------------

  // Items de navegación
  navItems = [
    { title: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { title: 'Clientes', icon: '👥', path: '/dashboard/clientes' },
  ];

  // Alterna el estado del sidebar: ocultar/mostrar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Alterna el estado del dropdown de usuario
  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  // Navegación de perfil (ejemplo)
  goToProfile() {
    console.log('Navegando a Perfil...');
    this.isUserDropdownOpen = false;
  }

  // Cierre de sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isUserDropdownOpen = false;
  }
}
