import dotenv from 'dotenv';

// Carga el archivo .env directamente desde la raíz del proyecto (api/.env)
dotenv.config({ path: '.env' });

export const variables_entorno_string = (
  name: string,
  defaultValue?: string,
): string => {
  return process.env[name] ?? defaultValue ?? '';
};

export const variables_entorno_number = (
  name: string,
  defaultValue?: number,
): number => {
  const value = process.env[name];
  return value ? Number(value) : (defaultValue ?? 0);
};
