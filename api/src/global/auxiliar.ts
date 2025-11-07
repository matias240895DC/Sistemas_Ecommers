import { encriptar_password } from '../config/encriptarPassword/encript';
export const CREATE_OBJECT_UPDATE = async (dto: any): Promise<object> => {
  const objecto_update: object = {};

  for (const key in dto) {
    if (key == 'pass') {
      objecto_update[key] = await encriptar_password(
        dto[key].toString().trim().toUpperCase(),
      );
    } else {
      objecto_update[key] = dto[key].toString().trim().toUpperCase();
    }
  }
  return objecto_update;
};

export const paginator = (limit: number, offset: number) => {
  console.log(limit);
  console.log(offset);

  // Aseguramos que limit y offset sean válidos
  const safeLimit = Math.max(Number(limit) || 10, 1);
  const safeOffset = Math.max(Number(offset) || 1, 1);

  return {
    limit: safeLimit,
    skip: (safeOffset - 1) * safeLimit,
  };
};
