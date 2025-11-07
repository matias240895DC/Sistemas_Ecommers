// src/redux/auth/usuario.services.ts
import { Injectable } from '@angular/core';
import { apiUrl } from '../../redux/variables';
import axios from 'axios';
import { Usuario } from '../../redux/models/auth_get.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  async getAll(filter: any) {

    const resultado = await axios.get(`${apiUrl}/usuarios`, {
      params: filter,
    });

    if (resultado.data?.status === 200) {
      return resultado.data;
    } else {
      console.log('❌ Error:', resultado.data);
    }
  }
}
