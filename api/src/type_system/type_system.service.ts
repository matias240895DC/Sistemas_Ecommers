import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import {
  typeSystemCreateDto,
  typeSystemGetDto,
  typeSystemUpdateId,
} from 'src/dto/type_system.dto';
import { TypeSystem } from 'src/models/schemas.type_system';

@Injectable()
export class TypeSystemService {
  constructor(
    @InjectModel(TypeSystem.name)
    private readonly typeSystemModel: Model<TypeSystem>,
  ) {}

  async GET_TYPE_SYSTEM(get: typeSystemGetDto) {
    const or: any[] = [];

    if (
      get?.id &&
      Types.ObjectId.isValid(get.id) &&
      new Types.ObjectId(get.id).toHexString() === get.id.toLowerCase()
    ) {
      or.push({ _id: get.id }); // o Number(get.id) si tu _id es numérico
    } else {
      if (
        get?.id &&
        (Types.ObjectId.isValid(get.id) ||
          new Types.ObjectId(get.id).toHexString() === get.id.toLowerCase())
      ) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'El id tiene que ser valido',
        };
      }
    }
    if (get?.nombre) {
      or.push({ nombre: get.nombre.toString().trim() });
    }

    return {
      status: HttpStatus.OK,
      result: await this.typeSystemModel.find({
        $or: or,
      }),
    };
  }

  async CREATE_TYPE_SYSTEM(post: typeSystemCreateDto) {
    const resultado_buscado = await this.typeSystemModel.findOne({
      nombre: post.nombre?.toUpperCase(),
    });

    if (resultado_buscado) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre del sistema ya existe',
      };
    }

    if (!post.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre del sistema no enviado',
      };
    }
    const resultado = await this.typeSystemModel.create({
      nombre: post.nombre.toUpperCase(),
    });

    resultado.save();
    return {
      status: HttpStatus.CREATED,
      message: 'Tipo de sistema creado correctamente',
    };
  }

  async UPDATE_TYPE_SYSTEM(id: string, update: typeSystemCreateDto) {
    if (!id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un tipo de sistema a modificar el nombre ',
      };
    }

    if (!update.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Ingrese un nombre del sistemas a actualizar',
      };
    }

    const result_update = await this.typeSystemModel.findOne({
      $and: [{ nombre: update.nombre.toUpperCase() }, { _id: { $ne: id } }],
    });

    if (result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre a modificar del sistema ya se encuentra registrado',
      };
    }
    await this.typeSystemModel
      .updateOne(
        { _id: id },
        { $set: { nombre: update.nombre?.toString().trim().toUpperCase() } },
      )
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'Usuario actualizado correctamente',
    };
  }

  async UPDATE_TYPE_SYSTEM_ACTIVAR(id: string) {
    if (!id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un tipo de sistemas a activar',
      };
    }

    const result_update = await this.typeSystemModel.findOne({
      _id: id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El tipo de sistema no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro de ${result_update.nombre.toLowerCase()} ya se encuentra activado`,
      };
    }
    await this.typeSystemModel
      .updateOne({ _id: id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El registro de ${result_update.nombre.toLowerCase()} se activo correctamente`,
    };
  }

  async UPDATE_TYPE_SYSTEM_DESACTIVAR(id: string) {
    if (!id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un tipo de sistemas a desactivar',
      };
    }

    const result_update = await this.typeSystemModel.findOne({
      _id: id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El tipo de sistema no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro de ${result_update.nombre.toLowerCase()} ya se encuentra desactivado`,
      };
    }
    await this.typeSystemModel
      .updateOne({ _id: id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El registro de ${result_update.nombre.toLowerCase()} se desactivo correctamente`,
    };
  }
}
