import { Routes } from '@angular/router';
import { Login } from './auth/auth/login/login';
import { NuevoRegistro } from './auth/auth/nuevo-registro/nuevo-registro';
import { UsuarioCreado } from './auth/auth/usuario-creado/usuario-creado';

<<<<<<< HEAD
export const routes: Routes = [];

=======
export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'registro',
        component: NuevoRegistro,
    },
    {
        path: 'usuario-creado',
        component: UsuarioCreado,
    }
];
>>>>>>> 38961fb89eab905d7aab8d38a78c43f0fac9fb34
