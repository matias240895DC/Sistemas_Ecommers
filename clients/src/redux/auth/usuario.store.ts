// src/redux/auth/usuario.store.ts
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { UserService } from '../../app/services/usuario.service';

interface AUTH_FILTRAR {
  loading: boolean;
  result: any;
}

const initialState: AUTH_FILTRAR = {
  loading: false,
  result: {},
};

export const UsuarioStoreFilter = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const userService = inject(UserService);

    return {
      loadUsers: async (filter: any) => {
        patchState(store, { loading: true });
        try {
          const result = await userService.getAll(filter);
          patchState(store, { result, loading: false });
        } catch (err: any) {
          console.error(err);
          patchState(store, { loading: false });
        }
      },
      clearUsers: () => patchState(store, { result: [], loading: false }),
    };
  })
);
