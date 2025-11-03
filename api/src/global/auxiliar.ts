export const CREATE_OBJECT_UPDATE = (dto: any): object => {
  const objecto_update: object = {};

  for (const key in dto) {
    objecto_update[key] = dto[key].toString().trim().toUpperCase();
  }
  return objecto_update;
};
