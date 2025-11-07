import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rol {
  nombre: string;
  activo: boolean;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {
  roles: Rol[] = [];
  isModalOpen = false;
  newRolNombre = '';
  newRolActivo = true;
  dropdowns: boolean[] = [];

  toggleEstado(rol: Rol) {
    rol.activo = !rol.activo;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newRolNombre = '';
    this.newRolActivo = true;
  }

  agregarRol() {
    if (this.newRolNombre) {
      this.roles.push({ nombre: this.newRolNombre, activo: this.newRolActivo });
      this.dropdowns.push(false);
      this.closeModal();
    }
  }

  editarRol(rol: Rol) {
    const nuevoNombre = prompt('Ingrese el nuevo nombre para el rol:', rol.nombre);
    if (nuevoNombre) {
      rol.nombre = nuevoNombre;
    }
  }

  eliminarRol(index: number) {
    this.roles.splice(index, 1);
    this.dropdowns.splice(index, 1);
  }

  toggleDropdown(index: number) {
    this.dropdowns[index] = !this.dropdowns[index];
  }
}