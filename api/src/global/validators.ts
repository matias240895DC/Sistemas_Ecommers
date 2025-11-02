import { HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';

export const VALIDAR_DATOS_EXISTENCIA = async (
  model: Model<any>,
  validar: object,
) => {
  const error: Array<string> = [];
  for (const key in validar) {
    const element = await model
      .find({ [key]: validar[key].toUpperCase() })
      .exec();
    if (element.length > 0) {
      error.push(`${key} ya se encuentra registrado`);
    }
  }
  return {
    status: error.length > 0 ? HttpStatus.CONFLICT : HttpStatus.OK,
    error,
  };
};

export const CREATE_DATO_VALIDATE = (
  dto: any,
  validate: Array<string>,
): object => {
  const validate_data: object = {};
  validate.forEach((element) => {
    if (element in dto) {
      validate_data[element] = dto[element];
    }
  });
  return validate_data;
};

export const CREATE_DATO_SEARCH_OR = (dto: any): Array<object> => {
  const validate_or: Array<object> = [];
  for (const key in dto) {
    const new_object = {};
    if (dto[key]) {
      if (key == 'id') {
        new_object['_id'] = dto[key];
      } else {
        new_object[key] = dto[key];
      }
      validate_or.push(new_object);
    }
  }
  return validate_or;
};

export const UPDATE_DATO_VALIDATE = async (
  dto: any,
  dtoId: any,
  validate: Array<string>,
  model: Model<any>,
): Promise<string[]> => {
  const orConditions: Array<object> = [];
  const errors: string[] = [];

  // Crear condiciones OR para los campos a validar
  validate.forEach((field) => {
    if (field in dto && dto[field] !== undefined && dto[field] !== null) {
      orConditions.push({ [field]: dto[field] });
    }
  });

  if (orConditions.length === 0) {
    return [];
  }

  // Buscar duplicados excepto el registro actual
  const search = await model.find({
    _id: { $ne: new Types.ObjectId(dtoId.id) },
    $or: orConditions,
  });

  // Si hay coincidencias, identificar cuáles campos están duplicados
  if (search.length > 0) {
    validate.forEach((field) => {
      const duplicated = search.find(
        (doc) =>
          doc[field] &&
          dto[field] &&
          String(doc[field]).toUpperCase() === String(dto[field]).toUpperCase(),
      );
      if (duplicated) {
        errors.push(`${field} ya se encuentra registrado`);
      }
    });
  }

  return errors;
};
// const result_update = await this.usuarioModel.findOne({
//   $and: UPDATE_DATO_VALIDATE(update, usuarioUpdateID, [
//     'usuario',
//     'email',
//     'numeroDocumento',
//     'telefono',
//   ]),
// });
