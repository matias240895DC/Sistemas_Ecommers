import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth/auth.service';
import { ThemeService } from '../../services/theme.service'; // Importa el servicio de tema
import { UsuarioStoreFilter } from '../../../redux/auth/usuario.store';
import { Usuario } from '../../../redux/models/auth_get.models';

/**
 * Interfaz para los ítems de navegación del sidebar.
 */
interface NavItem {
  title: string;
  icon?: string;
  path?: string;
  roles?: string[];
  isTitle?: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {
  private router = inject(Router);
  private authService = inject(AuthService);
  themeService = inject(ThemeService); // Inyecta el servicio de tema
  allUsuariofilter: Partial<Usuario> = {};
  navItems: NavItem[] = [];
  isSidebarOpen: boolean = true;
  isUserDropdownOpen: boolean = false;

  private allNavItems: NavItem[] = [
    { title: 'Home', isTitle: true },
    { title: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { title: 'Gestión de Clientes', isTitle: true },
    { title: 'Usuarios', icon: '👤', path: '/dashboard/usuarios', roles: ['ADMIN', 'MANAGER'] },
    { title: 'Gestión de Datos', isTitle: true },
    { title: 'Países', icon: '🌍', path: '/dashboard/paises', roles: ['ADMIN'] },
    { title: 'Provincias', icon: '🗺️', path: '/dashboard/provincias', roles: ['ADMIN'] },
    { title: 'Ciudades', icon: '🏙️', path: '/dashboard/ciudades', roles: ['ADMIN'] },
    { title: 'Roles', icon: '🎭', path: '/dashboard/roles', roles: ['ADMIN'] },
  ];

  constructor() {
    const userRole = this.authService.getUserRole();
    this.navItems = this.allNavItems.filter((item) => {
      if (item.isTitle || !item.roles) {
        return true;
      }
      return item.roles.includes(userRole);
    });
  }

  async toggleSidebar() {

    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  // Nuevo método para cambiar el tema
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  goToProfile() {
    console.log('Navegando a Perfil...');
    this.isUserDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isUserDropdownOpen = false;
  }
}
