export const EXAMPLE_DOC_LIST_ROL_LLENA = () => {
  return [
    {
      _id: '68f169baeeb50255e7134e41',
      nombre: 'SUPERADMIN',
      estado: true,
      __v: 0,
    },
    {
      _id: '68f169cdeeb50255e7134e45',
      nombre: 'ADMIN',
      estado: true,
      __v: 0,
    },
  ];
};

export const EXAMPLE_DOC_LIST_ROL_VACIA = () => {
  return [];
};

export const CONTENERDOR_DOC_FILTER_GET_ROL = () => {
  return {
    'application/json': {
      examples: {
        ListaLlena: {
          summary: 'Respuesta con roles encontrados',
          value: {
            status: 200,
            result: EXAMPLE_DOC_LIST_ROL_LLENA(),
          },
        },
        ListaVacia: {
          summary: 'Respuesta con lista vacía',
          value: {
            status: 200,
            result: EXAMPLE_DOC_LIST_ROL_VACIA(),
          },
        },
      },
    },
  };
};

//POST ROL

export const CONTENEDOR_DOC_CREATE_ROL_CORRECTAMENTE = () => {
  return {
    'application/json': {
      examples: {
        RolCreado: {
          summary: 'Rol creado',
          value: {
            status: 201,
            message: 'rol creado correctamente',
          },
        },
      },
    },
  };
};
export const CONTENEDOR_DOC_CREATE_ROL_ERROR = () => {
  return {
    'application/json': {
      examples: {
        RolCuandoYaExiste: {
          summary: 'Cuando el rol ya existe',
          value: {
            status: 409,
            message: 'El nombre del rol ya existe',
          },
        },
        RolCuandoFaltaEnviarElNombre: {
          summary: 'Cuando no se envia el rol',
          value: {
            status: 409,
            message: 'Tiene que ingresar el nombre del rol',
          },
        },
      },
    },
  };
};

// UPDATE ROL

export const CONTENEDOR_DOC_UPDATE_ROL_CORRECTAMENTE = () => {
  return {
    'application/json': {
      examples: {
        RolActualizado: {
          summary: 'Rol Actualizado',
          value: {
            status: 202,
            message: 'rol actualizado correctamente',
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_UPDATE_ROL_ERROR = () => {
  return {
    'application/json': {
      examples: {
        RolCuandoYaExiste: {
          summary: 'Cuando el rol ya existe',
          value: {
            status: 409,
            message: 'El nombre a modificar del rol ya se encuentra registrado',
          },
        },
        RolCuandoFaltaEnviarElNombre: {
          summary: 'Cuando no se ingresa el nombre del rol',
          value: {
            status: 409,
            message: 'Ingrese el nombre del rol a actualizar',
          },
        },
        RolCuandoNoSeEnviaElId: {
          summary: 'Cuando no se selecciona un rol',
          value: {
            status: 409,
            message: 'Seleccione el rol del sistema a modificar el nombre',
          },
        },
      },
    },
  };
};
// ACCION DESACTIVAR Y ACTIVAR ROL
export const CONTENEDOR_DOC_ACTIVAR_ROL_CORRECTAMENTE = () => {
  return {
    'application/json': {
      examples: {
        RolActivado: {
          summary: 'Rol activado',
          value: {
            status: 202,
            message: 'El rol se activo correctamente',
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_ACTIVAR_ROL_ERROR = () => {
  return {
    'application/json': {
      examples: {
        RolCuandoNoSeSelecciono: {
          summary: 'Cuando no se selecciono un rol a activar',
          value: {
            status: 409,
            message: 'Seleccione un rol de sistemas a activar',
          },
        },
        RolCuandoElRolNoEstaRegistrado: {
          summary: 'Cuando no se encuentra el rol a activar',
          value: {
            status: 409,
            message: 'El rol no se encuentra registrado',
          },
        },
        RolCuandoSeEncuentraActivado: {
          summary: 'Cuando el rol ya se encuentra activado',
          value: {
            status: 409,
            message:
              'El registro que trata de activar ya se encuentra activado',
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_DESACTIVAR_ROL_CORRECTAMENTE = () => {
  return {
    'application/json': {
      examples: {
        RolDesactivado: {
          summary: 'Rol desactivo',
          value: {
            status: 202,
            message: 'El rol se desactivo correctamente',
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_DESACTIVAR_ROL_ERROR = () => {
  return {
    'application/json': {
      examples: {
        RolCuandoNoSeSelecciono: {
          summary: 'Cuando no se selecciono un rol a desactivar',
          value: {
            status: 409,
            message: 'Seleccione un rol de sistemas a desactivar',
          },
        },
        RolCuandoElRolNoEstaRegistrado: {
          summary: 'Cuando no se encuentra el rol a desactivar',
          value: {
            status: 409,
            message: 'El rol no se encuentra registrado',
          },
        },
        RolCuandoSeEncuentraActivado: {
          summary: 'Cuando el rol ya se encuentra desactivado',
          value: {
            status: 409,
            message:
              'El registro que trata desactivar ya se encuentra desactivado',
          },
        },
      },
    },
  };
};
