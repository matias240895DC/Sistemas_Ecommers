import { Component, effect, inject, OnInit } from '@angular/core';
import { UsuarioStoreFilter } from '../../../../../redux/auth/usuario.store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../../../../redux/models/auth_get.models';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class Usuarios implements OnInit {
  // Objeto de filtros para enviar al backend
  allUsuariofilter: Partial<Usuario> = {}; // ✅ usamos Partial para que las props sean opcionales

  // Lista que se llenará con los resultados del backend
  allUsuario: Usuario[] = [];

  actionMenuOpen: number | null = null;

  // Filtros visuales y paginación
  searchTerm: string = '';
  selectedPlan: string = '';
  selectedStatus: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  // Store inyectado
  storeUsuario = inject(UsuarioStoreFilter);
  resultado_usuario: any;

  constructor() {}

  async loadUsuarios() {
    // 🔹 Podés setear filtros antes de llamar
    this.allUsuariofilter.limit = '10';
    this.allUsuariofilter.offset = '0';
    // this.allUsuariofilter.nombre = 'Matias'; // ejemplo de filtro dinámico

    await this.storeUsuario.loadUsers(this.allUsuariofilter);
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }
}
