import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Necesario para la navegación futura

// Interfaz que define la estructura de un cliente
interface Client {
  id: number;
  name: string;
  email: string;
  plan: 'Premium' | 'Mensual' | 'Semanal';
  status: 'Activo' | 'Inactivo';
  routineType: 'Fuerza' | 'Cardio' | 'Mixto'; // Nuevo campo solicitado
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.html', // Apunta al HTML que contiene la tabla
  styleUrls: ['./clients.css'] // Dejamos el CSS vacío por ahora
})
export class Clients {

  // Data simulada para mostrar en la tabla
  clients: Client[] = [
    { id: 1, name: 'Martín Gómez', email: 'martin@example.com', plan: 'Premium', status: 'Activo', routineType: 'Fuerza' },
    { id: 2, name: 'Laura Pérez', email: 'laura@example.com', plan: 'Mensual', status: 'Activo', routineType: 'Cardio' },
    { id: 3, name: 'Javier Diaz', email: 'javier@example.com', plan: 'Semanal', status: 'Inactivo', routineType: 'Mixto' },
    { id: 4, name: 'Sofía Ramirez', email: 'sofia@example.com', plan: 'Premium', status: 'Activo', routineType: 'Fuerza' },
    { id: 5, name: 'Pablo Soto', email: 'pablo@example.com', plan: 'Mensual', status: 'Activo', routineType: 'Cardio' },
  ];

  constructor() { }

  // --- Métodos de Acción para la Tabla ---

  openNewClientModal() {
    // Lógica para abrir un modal o navegar a la página de creación
    console.log('Abriendo modal para crear nuevo cliente...');
    // Cuando usemos rutas, esto podría ser this.router.navigate(['/dashboard/clientes/nuevo']);
  }

  viewClient(clientId: number) {
    // Lógica para ver los detalles del cliente
    console.log(`Ver detalles del cliente ID: ${clientId}`);
    // Cuando usemos rutas, esto podría ser this.router.navigate(['/dashboard/clientes', clientId]);
  }

  editClient(clientId: number) {
    // Lógica para editar el cliente
    console.log(`Editando cliente ID: ${clientId}`);
  }

  deleteClient(clientId: number) {
    // Lógica de eliminación (debería usar un modal de confirmación real)
    console.log(`Eliminando cliente ID: ${clientId}`);
    this.clients = this.clients.filter(client => client.id !== clientId);
  }
}