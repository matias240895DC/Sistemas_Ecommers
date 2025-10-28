import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
// Importa el servicio que acabas de crear
import { GeolocationService } from "../../services/geolocalization";

@Component({
  selector: 'app-gyms-list',
  standalone: true, // ✅ Componente autónomo
  imports: [CommonModule],

  // 👈 Plantilla en Línea (no requiere archivo .html separado)
  template: `
    <h2>📍 Gimnasios Cercanos</h2>
    
    <div *ngIf="errorMessage" class="alert alert-danger">
      Error: {{ errorMessage }} 
      <button (click)="loadNearbyGyms()">Reintentar</button>
    </div>
    
    <div *ngIf="isLoading">Buscando tu ubicación y gimnasios...</div>

    <ul *ngIf="!isLoading && gyms.length > 0">
      <li *ngFor="let gym of gyms">
        {{ gym.name }} (Lat: {{ gym.lat }}, Lon: {{ gym.lon }})
      </li>
    </ul>

    <p *ngIf="!isLoading && gyms.length === 0">
      No se encontraron gimnasios en tu zona.
    </p>
  `,
})
export class GymsListComponent implements OnInit {

  gyms: any[] = [];
  errorMessage: string | null = null;
  isLoading: boolean = true;

  // 1. Inyecta el servicio GeolocationService en el constructor
  constructor(private geoService: GeolocationService) { }

  ngOnInit(): void {
    this.loadNearbyGyms();
  }

  loadNearbyGyms(): void {
    this.errorMessage = null;
    this.isLoading = true;

    this.geoService.getCurrentLocation().subscribe({
      next: (coords) => {
        // ÉXITO: Tenemos las coordenadas del usuario
        console.log('Ubicación obtenida:', coords);

        // 2. Llama aquí a tu servicio de backend (GymsService, no mostrado)
        // para filtrar gimnasios por (coords.latitude, coords.longitude)

        // **Simulación de datos obtenidos del backend**
        this.gyms = [
          { name: "Gym Central", lat: coords.latitude + 0.01, lon: coords.longitude },
          { name: "Gym Oeste", lat: coords.latitude, lon: coords.longitude - 0.02 }
        ];

        this.isLoading = false;
      },
      error: (err) => {
        // ERROR: Permiso denegado, timeout, etc.
        this.errorMessage = err;
        this.isLoading = false;
        // Cargar gimnasios por defecto si no se pudo obtener la ubicación
        this.gyms = [];
      }
    });
  }
}
