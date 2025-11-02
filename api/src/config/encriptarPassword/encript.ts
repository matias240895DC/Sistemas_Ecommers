import * as bcrypt from 'bcrypt';
import { variables_entorno_number } from '../variable_entorno';

export const encriptar_password = async (password: string) => {
  return await bcrypt.hash(
    password,
    variables_entorno_number('SALTO_LINEA_PASSWORD'),
  );
};

export const descriptar_password = async (
  passwordEncript: string,
  passwordUser: string,
) => {
  return await bcrypt.compare(passwordUser, passwordEncript);
};
