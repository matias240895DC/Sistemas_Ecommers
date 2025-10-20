import { Routes } from '@angular/router';
import { Login } from './auth/auth/login/login';
import { NuevoRegistro } from './auth/auth/nuevo-registro/nuevo-registro';
import { UsuarioCreado } from './auth/auth/usuario-creado/usuario-creado';
import { RecuperarContra } from './auth/auth/recuperar-contra/recuperar-contra';
import { EnlaceEnviado } from './auth/auth/enlace-enviado/enlace-enviado';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'registro', component: NuevoRegistro },
    { path: 'usuario-creado', component: UsuarioCreado },
    { path: 'recuperar-contrasena', component: RecuperarContra },
    { path: 'enlace-enviado', component: EnlaceEnviado },
];

