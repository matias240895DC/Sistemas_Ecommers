import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Provincia {
  nombre: string;
  activo: boolean;
}

@Component({
  selector: 'app-provincias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './provincias.html',
  styleUrl: './provincias.css'
})
export class Provincias {
  provincias: Provincia[] = [];
  isModalOpen = false;
  isEditModalOpen = false;
  isDeleteModalOpen = false;
  newProvinciaNombre = '';
  editingProvincia: Provincia = { nombre: '', activo: false };
  deletingProvinciaIndex: number | null = null;
  dropdowns: boolean[] = [];

  toggleEstado(provincia: Provincia) {
    provincia.activo = !provincia.activo;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newProvinciaNombre = '';
  }

  agregarProvincia() {
    if (this.newProvinciaNombre) {
      this.provincias.push({ nombre: this.newProvinciaNombre, activo: true });
      this.dropdowns.push(false);
      this.closeModal();
    }
  }

  openEditModal(provincia: Provincia) {
    this.editingProvincia = { ...provincia };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  guardarEdicion() {
    const index = this.provincias.findIndex(p => p.nombre === this.editingProvincia.nombre);
    if (index !== -1) {
      this.provincias[index] = this.editingProvincia;
    }
    this.closeEditModal();
  }

  openDeleteModal(index: number) {
    this.deletingProvinciaIndex = index;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.deletingProvinciaIndex = null;
  }

  confirmarEliminacion() {
    if (this.deletingProvinciaIndex !== null) {
      this.provincias.splice(this.deletingProvinciaIndex, 1);
      this.dropdowns.splice(this.deletingProvinciaIndex, 1);
      this.closeDeleteModal();
    }
  }

  toggleDropdown(index: number) {
    this.dropdowns[index] = !this.dropdowns[index];
  }
}