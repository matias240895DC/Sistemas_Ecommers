import { Routes } from '@angular/router';
import { Login } from './auth/auth/login/login';
import { NuevoRegistro } from './auth/auth/nuevo-registro/nuevo-registro';
import { UsuarioCreado } from './auth/auth/usuario-creado/usuario-creado';
import { RecuperarContra } from './auth/auth/recuperar-contra/recuperar-contra';
import { EnlaceEnviado } from './auth/auth/enlace-enviado/enlace-enviado';
import { RestablecerContra } from './auth/auth/restablecer-contra/restablecer-contra';
import { ContraRestablecida } from './auth/auth/contra-restablecida/contra-restablecida';
import { UsuarioActivado } from './auth/auth/usuario-activado/usuario-activado';
import { Landing } from './pages/landing/landing';
import { ReinscripcionDenegada } from './auth/auth/reinscripcion-denegada/reinscripcion-denegada';
import { GymsListComponent } from './pages/gyms-list/gyms-list';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/dashboard/features/home/home';
import { Clients } from './pages/dashboard/features/clients/clients';
import { Paises } from './pages/dashboard/features/gestion-datos/paises/paises';
import { Provincias } from './pages/dashboard/features/gestion-datos/provincias/provincias';
import { Ciudades } from './pages/dashboard/features/gestion-datos/ciudades/ciudades';
import { Roles } from './pages/dashboard/features/gestion-datos/roles/roles';

export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', component: Landing },
    { path: 'gimnasios', component: GymsListComponent },
    { path: 'login', component: Login },
    { path: 'registro', component: NuevoRegistro },
    { path: 'usuario-creado', component: UsuarioCreado },
    { path: 'recuperar-contraseña', component: RecuperarContra },
    { path: 'enlace-enviado', component: EnlaceEnviado },
    { path: 'restablecer-contra', component: RestablecerContra },
    { path: 'contra-restablecida', component: ContraRestablecida },
    { path: 'usuario-activado', component: UsuarioActivado },
    { path: 'reinscripcion-denegada', component: ReinscripcionDenegada },
    {
        path: 'dashboard',
        component: Dashboard,
        children: [
            { path: '', component: Home }, // <-- Necesita este componente // ...
            { path: 'clientes', component: Clients },
            { path: 'paises', component: Paises },
            { path: 'provincias', component: Provincias },
            { path: 'ciudades', component: Ciudades },
            { path: 'roles', component: Roles },
        ]
    }
];

