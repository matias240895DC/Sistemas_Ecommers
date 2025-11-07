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
