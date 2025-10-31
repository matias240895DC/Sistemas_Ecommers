import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- INTERFACES DE DATOS ---

// Interfaz para las métricas de las tarjetas principales
interface Metrics {
  activeClients: number;
  monthlyRevenue: number;
  newRegistrations: number;
  retentionRate: number;
}

// Interfaz para la lista de clientes recientes
interface RecentClient {
  name: string;
  plan: string;
  date: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html', // Asume que el HTML está en el mismo directorio
  styleUrls: ['./home.css']
})
export class Home {

  // Data simulada para las tarjetas de métricas
  metrics: Metrics = {
    activeClients: 452,
    monthlyRevenue: 12500.55,
    newRegistrations: 28,
    retentionRate: 83
  };

  // Data simulada para la lista de clientes recientes
  recentClients: RecentClient[] = [
    { name: 'Martina Diaz', plan: 'Premium', date: '3 min atrás' },
    { name: 'Lucas Gómez', plan: 'Básico', date: '1 hora atrás' },
    { name: 'Sofía Herrera', plan: 'Clases Grupales', date: 'Ayer' },
    { name: 'Andrés Castro', plan: 'Premium', date: '2 días atrás' },
  ];

  constructor() {
    // Si quieres cargar esta data de un servicio real, lo harías aquí:
    // this.dataService.getMetrics().subscribe(data => this.metrics = data);
  }
}
