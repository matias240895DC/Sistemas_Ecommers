import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ciudad {
  nombre: string;
  activo: boolean;
}

@Component({
  selector: 'app-ciudades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ciudades.html',
  styleUrl: './ciudades.css'
})
export class Ciudades {
  ciudades: Ciudad[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  newCiudadNombre = '';
  editingCiudad: Ciudad = { nombre: '', activo: false };
  deletingCiudadIndex: number | null = null;
  dropdowns: boolean[] = [];

  toggleEstado(ciudad: Ciudad) {
    ciudad.activo = !ciudad.activo;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newCiudadNombre = '';
  }

  agregarCiudad() {
    if (this.newCiudadNombre) {
      this.ciudades.push({ nombre: this.newCiudadNombre, activo: true });
      this.dropdowns.push(false);
      this.closeModal();
    }
  }

  openEditModal(ciudad: Ciudad) {
    this.editingCiudad = { ...ciudad };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  guardarEdicion() {
    const index = this.ciudades.findIndex(c => c.nombre === this.editingCiudad.nombre);
    if (index !== -1) {
      this.ciudades[index] = this.editingCiudad;
    }
    this.closeEditModal();
  }

  openDeleteModal(index: number) {
    this.deletingCiudadIndex = index;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.deletingCiudadIndex = null;
  }

  confirmarEliminacion() {
    if (this.deletingCiudadIndex !== null) {
      this.ciudades.splice(this.deletingCiudadIndex, 1);
      this.dropdowns.splice(this.deletingCiudadIndex, 1);
      this.closeDeleteModal();
    }
  }

  toggleDropdown(index: number) {
    this.dropdowns[index] = !this.dropdowns[index];
  }
}