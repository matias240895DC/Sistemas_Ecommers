import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    // 'root' hace que esté disponible en toda la aplicación
    providedIn: 'root'
})
export class AuthService {
    // Variable simulada para el rol del usuario (cambia esto para probar permisos)
    // Valores posibles: 'ADMIN', 'MANAGER', 'EMPLOYEE'
    private simulatedUserRole: string = 'ADMIN';

    // Este método simula la llamada a la API de login
    authenticate(username: string, password: string): Observable<boolean> {
        // -----------------------------------------------------------------
        // SIMULACIÓN DE LOGIN EXITOSO:
        if (username === 'pabloejemplo' && password === '12345') {
            // Simula que guardas el token de sesión
            localStorage.setItem('auth_token', 'TOKEN_DE_SESION_SIMULADO');
            console.log('AuthService: Token guardado exitosamente.');
            return of(true);
        }

        // SIMULACIÓN DE LOGIN FALLIDO:
        console.error('AuthService: Credenciales incorrectas, login fallido.');
        return of(false);
        // -----------------------------------------------------------------
    }

    /**
     * Devuelve el rol del usuario actual. 
     * En una aplicación real, esto se leería del token JWT.
     */
    getUserRole(): string {
        // En un caso real:
        // 1. Leerías el token de localStorage
        // 2. Decodificarías el token JWT para obtener el claim 'role'
        // Por ahora, devolvemos el rol simulado para que Dashboard.ts pueda filtrar.
        return this.simulatedUserRole;
    }

    /**
     * Limpia la sesión del usuario.
     * Requerido por Dashboard.ts para el botón "Cerrar Sesión".
     */
    logout(): void {
        localStorage.removeItem('auth_token');
        console.log('AuthService: Sesión cerrada, token eliminado.');
        // Opcional: Redireccionar aquí, aunque en el dashboard lo hacemos con router.navigate
    }

    // Método usado por el AuthGuard para verificar si hay token
    isLoggedIn(): boolean {
        return !!localStorage.getItem('auth_token');
    }
}