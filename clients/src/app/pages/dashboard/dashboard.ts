import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Asumo que tienes el AuthService en esta ruta
import { AuthService } from '../../auth/auth/auth.service';

/**
 * Interfaz para los ítems de navegación del sidebar.
 * La definimos aquí para que TypeScript sepa cómo es el objeto NavItem.
 */
interface NavItem {
  title: string;
  icon: string; // Usaremos Emojis o iconos SVG/lucide-react
  path: string;
  roles?: string[]; // Propiedad opcional para controlar los permisos
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  // Inyección de servicios usando el método inject()
  private router = inject(Router);
  private authService = inject(AuthService);

  // Lista de ítems de navegación que se renderizarán
  navItems: NavItem[] = [];

  // --- VARIABLES DE CONTROL DE VISTA ---
  // El sidebar estará abierto por defecto para escritorio (desktop)
  isSidebarOpen: boolean = true;
  // Controla el menú desplegable de usuario en el header
  isUserDropdownOpen: boolean = false;
  // ------------------------------------

  // 1. Defino la lista COMPLETA de ítems
  private allNavItems: NavItem[] = [
    { title: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { title: 'Clientes', icon: '👤', path: '/dashboard/clientes', roles: ['ADMIN', 'MANAGER'] }, // Solo estos roles
    { title: 'Inventario', icon: '📦', path: '/dashboard/inventario', roles: ['ADMIN', 'MANAGER', 'EMPLOYEE'] },
    // Puedes añadir más ítems aquí:
    { title: 'Reportes', icon: '📊', path: '/dashboard/reportes', roles: ['ADMIN', 'MANAGER'] },
  ];

  constructor() {
    // 2. Filtramos los ítems al inicializar el componente
    // Nota: El método getUserRole debe existir en AuthService (lo corregí en el archivo anterior).
    const userRole = this.authService.getUserRole();

    this.navItems = this.allNavItems.filter(item => {
      // Si el item no tiene roles definidos (como Dashboard), siempre se muestra
      if (!item.roles) {
        return true;
      }
      // Verificamos que el rol del usuario esté en la lista permitida para este ítem
      return item.roles.includes(userRole);
    });
  }

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
    // this.router.navigate(['/dashboard/perfil']); // Usarías esto para navegar
  }

  // Cierre de sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isUserDropdownOpen = false;
  }
}
