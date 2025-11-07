// src/redux/models/auth_get.models.ts
export interface Usuario {
  _id?: string;
  nombre?: string;
  usuario?: string;
  apellido?: string;
  email?: string;
  codigoArea?: string;
  telefono?: string;
  numeroDocumento?: string;
  tipoDocumento?: string;
  rol?: any;
  ciudad?: any;
  provincias?: any;
  pais?: any;
  estado?: boolean;
  limit?: string;
  offset?: string;
}

export interface AUTH_FILTRAR {
  status: number;
  result: {};
  loading: boolean;
}
