import { Routes } from '@angular/router';
import { Login } from './auth/auth/login/login';
import { NuevoRegistro } from './auth/auth/nuevo-registro/nuevo-registro';
import { UsuarioCreado } from './auth/auth/usuario-creado/usuario-creado';

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
