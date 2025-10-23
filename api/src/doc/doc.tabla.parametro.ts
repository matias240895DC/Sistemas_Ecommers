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

export const CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET = (nombre: string) => {
  return {
    'application/json': {
      examples: {
        ListaLlena: {
          summary: `Respuesta con ${nombre} encontrados`,
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

export const CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolCreado: {
          summary: `${nombre} creado`,
          value: {
            status: 201,
            message: `${nombre} creado correctamente`,
          },
        },
      },
    },
  };
};
export const CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR = (nombre: string) => {
  return {
    'application/json': {
      examples: {
        RolCuandoYaExiste: {
          summary: `cuando el ${nombre} ya existe`,
          value: {
            status: 409,
            message: `El nombre del ${nombre} ya existe`,
          },
        },
        RolCuandoFaltaEnviarElNombre: {
          summary: `Cuando no se envia el ${nombre}`,
          value: {
            status: 409,
            message: `Tiene que ingresar el nombre del  ${nombre}`,
          },
        },
      },
    },
  };
};

// UPDATE ROL

export const CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolActualizado: {
          summary: `${nombre} Actualizado`,
          value: {
            status: 202,
            message: `${nombre} actualizado correctamente`,
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_ERROR = (nombre: string) => {
  return {
    'application/json': {
      examples: {
        RolCuandoYaExiste: {
          summary: `Cuando el ${nombre} ya existe`,
          value: {
            status: 409,
            message: `El nombre a modificar del ${nombre} ya se encuentra registrado`,
          },
        },
        RolCuandoFaltaEnviarElNombre: {
          summary: `Cuando no se ingresa el nombre de ${nombre}`,
          value: {
            status: 409,
            message: `Ingrese el nombre del ${nombre} a actualizar`,
          },
        },
        RolCuandoNoSeEnviaElId: {
          summary: `Cuando no se selecciona un ${nombre}`,
          value: {
            status: 409,
            message: `Seleccione el ${nombre} del sistema a modificar el nombre`,
          },
        },
      },
    },
  };
};
// ACCION DESACTIVAR Y ACTIVAR ROL
export const CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolActivado: {
          summary: `${nombre} activado`,
          value: {
            status: 202,
            message: `El ${nombre} se activo correctamente`,
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolCuandoNoSeSelecciono: {
          summary: `${nombre} Cuando no se selecciono un rol a activar`,
          value: {
            status: 409,
            message: `Seleccione un ${nombre} de sistemas a activar`,
          },
        },
        RolCuandoElRolNoEstaRegistrado: {
          summary: `Cuando no se encuentra el ${nombre} a activar`,
          value: {
            status: 409,
            message: `El ${nombre} no se encuentra registrado`,
          },
        },
        RolCuandoSeEncuentraActivado: {
          summary: `Cuando el ${nombre} ya se encuentra activado`,
          value: {
            status: 409,
            message: `El ${nombre} que trata de activar ya se encuentra activado`,
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolDesactivado: {
          summary: `${nombre} desactivo`,
          value: {
            status: 202,
            message: `El ${nombre} se desactivo correctamente`,
          },
        },
      },
    },
  };
};

export const CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        RolCuandoNoSeSelecciono: {
          summary: `Cuando no se selecciono un ${nombre} a desactivar`,
          value: {
            status: 409,
            message: `Seleccione un ${nombre} de sistemas a desactivar`,
          },
        },
        RolCuandoElRolNoEstaRegistrado: {
          summary: `Cuando no se encuentra el rol a desactivar`,
          value: {
            status: 409,
            message: `El ${nombre} no se encuentra registrado`,
          },
        },
        RolCuandoSeEncuentraActivado: {
          summary: `Cuando el ${nombre} ya se encuentra desactivado`,
          value: {
            status: 409,
            message: `El ${nombre} que trata desactivar ya se encuentra desactivado`,
          },
        },
      },
    },
  };
};
