import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    // 'root' hace que esté disponible en toda la aplicación (perfecto para standalone)
    providedIn: 'root'
})
export class AuthService {

    // Usa una constante para la clave
    private readonly AUTH_TOKEN_KEY = 'auth_token';

    // Este método simula la llamada a la API de login
    // Retorna un Observable<boolean> para simular la asincronía del HTTP
    authenticate(username: string, password: string): Observable<boolean> {
        // ... (Tu lógica existente para login)

        // SIMULACIÓN DE LOGIN EXITOSO:
        if (username && password) {
            // 2. Simula que guardas el token de sesión 
            localStorage.setItem(this.AUTH_TOKEN_KEY, 'TOKEN_DE_SESION_SIMULADO');
            console.log('AuthService: Token guardado exitosamente.');
            return of(true); // Retorna 'true' para indicar que el login fue exitoso
        }

        // SIMULACIÓN DE LOGIN FALLIDO:
        console.error('AuthService: Credenciales vacías, login fallido.');
        this.logout(); // Asegurarse de que no quede token en caso de fallo.
        return of(false); // Retorna 'false'
    }

    // Método usado por el AuthGuard para chequear si hay sesión
    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    // ************************************************************
    // *** MÉTODO FALTANTE: logout() ***
    // ************************************************************
    logout(): void {
        // Elimina el token para cerrar la sesión
        localStorage.removeItem(this.AUTH_TOKEN_KEY);
        console.log('AuthService: Sesión cerrada, token eliminado.');
    }
}