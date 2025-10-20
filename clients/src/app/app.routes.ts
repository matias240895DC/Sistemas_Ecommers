import { Routes } from '@angular/router';
import { Login } from './auth/auth/login/login';
import { NuevoRegistro } from './auth/auth/nuevo-registro/nuevo-registro';
import { UsuarioCreado } from './auth/auth/usuario-creado/usuario-creado';
import { RecuperarContra } from './auth/auth/recuperar-contra/recuperar-contra';
import { EnlaceEnviado } from './auth/auth/enlace-enviado/enlace-enviado';

<<<<<<< HEAD
export const routes: Routes = [];

=======
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'registro', component: NuevoRegistro },
    { path: 'usuario-creado', component: UsuarioCreado },
    { path: 'recuperar-contraseña', component: RecuperarContra },
    { path: 'enlace-enviado', component: EnlaceEnviado },
];
<<<<<<< HEAD

=======
>>>>>>> 38961fb89eab905d7aab8d38a78c43f0fac9fb34
>>>>>>> 35eb1368e9b9fd31b7e19c94872d1ebd9b1267ca
