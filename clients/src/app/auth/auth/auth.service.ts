// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    // 'root' hace que esté disponible en toda la aplicación (perfecto para standalone)
    providedIn: 'root'
})
export class AuthService {

    // Este método simula la llamada a la API de login
    // Retorna un Observable<boolean> para simular la asincronía del HTTP
    authenticate(username: string, password: string): Observable<boolean> {

        // Aquí iría tu lógica real de HttpClient.post() a la API

        // -----------------------------------------------------------------
        // SIMULACIÓN DE LOGIN EXITOSO:
        // 1. Asume que el login es exitoso si las credenciales no están vacías
        if (username && password) {
            // 2. Simula que guardas el token de sesión (esto es lo que verifica si estás logueado)
            localStorage.setItem('auth_token', 'TOKEN_DE_SESION_SIMULADO');
            console.log('AuthService: Token guardado exitosamente.');
            return of(true); // Retorna 'true' para indicar que el login fue exitoso
        }

        // SIMULACIÓN DE LOGIN FALLIDO:
        console.error('AuthService: Credenciales vacías, login fallido.');
        return of(false); // Retorna 'false'
        // -----------------------------------------------------------------
    }

    // Método usado por el AuthGuard (si decides implementarlo después)
    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}