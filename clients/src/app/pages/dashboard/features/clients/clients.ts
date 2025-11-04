import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interfaz actualizada para la nueva estructura de cliente
interface Client {
  id: number;
  name: string;
  email: string;
  empresa: string;
  plan: 'BASICO' | 'PRO' | 'PREMIUM';
  status: 'ACTIVO' | 'INACTIVO';
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class Clients implements OnInit {

  // --- DATOS SIMULADOS ACTUALIZADOS ---
  allClients: Client[] = [
    { id: 1, name: 'Martín Gómez', email: 'martin@example.com', empresa: 'Tech Solutions', plan: 'PREMIUM', status: 'ACTIVO' },
    { id: 2, name: 'Laura Pérez', email: 'laura@example.com', empresa: 'Innovate Co.', plan: 'PRO', status: 'ACTIVO' },
    { id: 3, name: 'Javier Diaz', email: 'javier@example.com', empresa: 'Marketing Digital', plan: 'BASICO', status: 'INACTIVO' },
    { id: 4, name: 'Sofía Ramirez', email: 'sofia@example.com', empresa: 'Creative Minds', plan: 'PREMIUM', status: 'ACTIVO' },
    { id: 5, name: 'Pablo Soto', email: 'pablo@example.com', empresa: 'Health & Wellness', plan: 'PRO', status: 'ACTIVO' },
    { id: 6, name: 'Ana Torres', email: 'ana@example.com', empresa: 'Future Tech', plan: 'PREMIUM', status: 'INACTIVO' },
    { id: 7, name: 'Carlos Ruiz', email: 'carlos@example.com', empresa: 'Global Exports', plan: 'BASICO', status: 'ACTIVO' },
    { id: 8, name: 'Elena Vidal', email: 'elena@example.com', empresa: 'Service First', plan: 'PRO', status: 'ACTIVO' },
    { id: 9, name: 'Miguel Ángel', email: 'miguel@example.com', empresa: 'Art & Design', plan: 'PREMIUM', status: 'ACTIVO' },
    { id: 10, name: 'Isabel Roca', email: 'isabel@example.com', empresa: 'Data Analytics', plan: 'BASICO', status: 'INACTIVO' },
  ];

  // --- ESTADO DE LA UI ---
  filteredClients: Client[] = [];
  paginatedClients: Client[] = [];
  actionMenuOpen: number | null = null; // Controla qué menú de acción está abierto

  // Filtros y Búsqueda (se mantiene la lógica anterior)
  searchTerm: string = '';
  selectedPlan: string = '';
  selectedStatus: string = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.applyFilters();
  }

  // --- LÓGICA DE FILTRADO Y BÚSQUEDA ---
  applyFilters(event?: Event): void {
    const element = event?.target as HTMLInputElement | HTMLSelectElement;
    if (element) {
        if (element.tagName === 'INPUT') {
            this.searchTerm = element.value;
        } else if (element.tagName === 'SELECT') {
            if (element.outerHTML.includes('Todos los Planes')) {
                this.selectedPlan = element.value;
            } else if (element.outerHTML.includes('Todos los Estados')) {
                this.selectedStatus = element.value;
            }
        }
    }

    let clients = this.allClients;
    if (this.searchTerm) {
        const lowerTerm = this.searchTerm.toLowerCase();
        clients = clients.filter(c => c.name.toLowerCase().includes(lowerTerm) || c.email.toLowerCase().includes(lowerTerm));
    }
    if (this.selectedPlan) {
        clients = clients.filter(c => c.plan === this.selectedPlan);
    }
    if (this.selectedStatus) {
        clients = clients.filter(c => c.status === this.selectedStatus);
    }

    this.filteredClients = clients;
    this.currentPage = 1;
    this.updatePagination();
  }

  // --- LÓGICA DE PAGINACIÓN ---
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage);
    if (this.totalPages === 0) this.totalPages = 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedClients = this.filteredClients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePagination();
    }
  }

  // --- MÉTODOS DE ACCIÓN DE LA TABLA ---
  toggleStatus(client: Client): void {
    client.status = client.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    // Aquí podrías añadir una llamada a un servicio para persistir el cambio
    console.log(`Cambiando estado de ${client.name} a ${client.status}`);
  }

  toggleActionMenu(clientId: number): void {
    this.actionMenuOpen = this.actionMenuOpen === clientId ? null : clientId;
  }

  viewClient(clientId: number): void {
    console.log(`Ver detalles del cliente ID: ${clientId}`);
    this.actionMenuOpen = null; // Cierra el menú después de la acción
  }

  editClient(clientId: number): void {
    console.log(`Editando cliente ID: ${clientId}`);
    this.actionMenuOpen = null; // Cierra el menú después de la acción
  }

  // --- OTROS MÉTODOS ---
  openNewClientModal(): void {
    console.log('Abriendo modal para crear nuevo cliente...');
  }

  exportToExcel(): void {
    console.log('Exportando datos a Excel...');
  }
}