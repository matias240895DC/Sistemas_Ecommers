// Singular
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

export const CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  const nombre_ejemplo = `${nombre}Creado`;
  return {
    'application/json': {
      examples: {
        [nombre_ejemplo]: {
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
        [`${nombre}YaExiste`]: {
          summary: `cuando el ${nombre} ya existe`,
          value: {
            status: 409,
            message: `El nombre del ${nombre} ya existe`,
          },
        },
        [`${nombre}CuandoFaltaEnviarElNombre`]: {
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
export const CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE = (
  nombre: string,
) => {
  return {
    'application/json': {
      examples: {
        [`${nombre}Actualizado`]: {
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
        [`${nombre}CuandoYaExiste`]: {
          summary: `Cuando el ${nombre} ya existe`,
          value: {
            status: 409,
            message: `El nombre a modificar del ${nombre} ya se encuentra registrado`,
          },
        },
        [`${nombre}CuandoFaltaEnviarElNombre`]: {
          summary: `Cuando no se ingresa el nombre de ${nombre}`,
          value: {
            status: 409,
            message: `Ingrese el nombre del ${nombre} a actualizar`,
          },
        },
        [`${nombre}CuandoNoSeEnviaElId`]: {
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
        [`${nombre}CuandoNoSeSelecciono`]: {
          summary: `Cuando no se selecciono un ${nombre} a activar`,
          value: {
            status: 409,
            message: `Seleccione un ${nombre} de sistemas a activar`,
          },
        },
        [`${nombre}CuandoElRolNoEstaRegistrado`]: {
          summary: `Cuando no se encuentra el ${nombre} a activar`,
          value: {
            status: 409,
            message: `El ${nombre} no se encuentra registrado`,
          },
        },
        [`${nombre}CuandoSeEncuentraActivado`]: {
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
        [`${nombre}Desactivado`]: {
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
        [`${nombre}CuandoNoSeSelecciono`]: {
          summary: `Cuando no se selecciono un ${nombre} a desactivar`,
          value: {
            status: 409,
            message: `Seleccione un ${nombre} de sistemas a desactivar`,
          },
        },
        [`${nombre}CuandoElRolNoEstaRegistrado`]: {
          summary: `Cuando no se encuentra el rol a desactivar`,
          value: {
            status: 409,
            message: `El ${nombre} no se encuentra registrado`,
          },
        },
        [`${nombre}CuandoSeEncuentraDesactivado`]: {
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

// Multiple

export const CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE = (
  nombre: string,
  values: string[],
) => {
  const examples: any = {};

  values.forEach((values) => {
    examples[`${nombre}YaExiste`] = {
      summary: `cuando ${values} ya existe`,
      value: {
        status: 409,
        message: `${values} ya existe`,
      },
    };

    examples[`${nombre}CuandoFaltaEnviar${values}`] = {
      summary: `Cuando no se envia ${values}`,
      value: {
        status: 409,
        message: `Tiene que ingresar ${values}`,
      },
    };
  });

  return {
    'application/json': {
      examples,
    },
  };
};
