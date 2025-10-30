import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Interfaz para tipar la respuesta de la ubicación
interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  /**
   * Verifica si el navegador soporta la API Geolocation.
   */
  public isGeolocationSupported(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Obtiene la ubicación actual del usuario como un Observable.
   * Maneja los permisos y los errores.
   */
  public getCurrentLocation(): Observable<Coordinates> {
    const subject = new Subject<Coordinates>();

    // 1. Verificar si el navegador lo soporta
    if (!this.isGeolocationSupported()) {
      subject.error('Geolocation NO soportada por el navegador.');
      return subject.asObservable();
    }

    // 2. Usar el método getCurrentPosition
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Éxito: Se obtienen las coordenadas precisas
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log(coords);
        subject.next(coords);
        subject.complete(); // Finaliza el Observable
      },
      (error) => {
        // Error: El usuario negó el permiso o hubo un fallo
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso denegado por el usuario.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera de solicitud agotado.';
            break;
          default:
            errorMessage = 'Ocurrió un error desconocido.';
            break;
        }
        subject.error(errorMessage);
        subject.complete();
      }
      // Opcional: Puedes pasar el objeto options como tercer argumento
      // , { enableHighAccuracy: true, timeout: 5000 } 
    );

    return subject.asObservable();
  }
}
