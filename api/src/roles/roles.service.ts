import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccionDto } from 'src/dto/rolesAccion.dto';
import { rolCreateDto } from 'src/dto/rolesCreate.dto';
import { rolGetDto } from 'src/dto/rolesGet.dto';
import { rolUpdateDto } from 'src/dto/rolesUpdate.dto';
import { UpdateIdtDto } from 'src/dto/rolesUpdateId.dto';
import { Rol } from 'src/models/schemas.rol';

@Injectable()
export class RolService {
  constructor(
    @InjectModel(Rol.name)
    private readonly rolModel: Model<Rol>,
  ) {}

  async GET_ROL(get: rolGetDto) {
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
      or.push({ nombre: get.nombre.toString().trim().toUpperCase() });
    }

    return {
      status: HttpStatus.OK,
      result: await this.rolModel.find({
        $or: or,
      }),
    };
  }

  async CREATE_ROL(post: rolCreateDto) {
    const resultado_buscado = await this.rolModel.findOne({
      nombre: post.nombre?.toUpperCase(),
    });

    if (resultado_buscado) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre del rol ya existe',
      };
    }

    if (!post.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Tiene que ingresar el nombre del rol',
      };
    }
    const resultado = await this.rolModel.create({
      nombre: post.nombre.toUpperCase(),
    });

    resultado.save();
    return {
      status: HttpStatus.CREATED,
      message: 'rol creado correctamente',
    };
  }

  async UPDATE_ROL(roleUpdateID: UpdateIdtDto, update: rolUpdateDto) {
    if (!roleUpdateID.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione el rol del sistema a modificar el nombre',
      };
    }

    if (!update.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Ingrese el nombre del rol a actualizar',
      };
    }

    const result_update = await this.rolModel.findOne({
      $and: [
        { nombre: update.nombre.toUpperCase() },
        { _id: { $ne: roleUpdateID.id } },
      ],
    });

    if (result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre a modificar del rol ya se encuentra registrado',
      };
    }
    await this.rolModel
      .updateOne(
        { _id: roleUpdateID.id },
        { $set: { nombre: update.nombre?.toString().trim().toUpperCase() } },
      )
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'rol actualizado correctamente',
    };
  }

  async UPDATE_ROL_ACTIVAR(sendParams: AccionDto) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un rol de sistemas a activar',
      };
    }

    const result_update = await this.rolModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El rol no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro que trata de activar ya se encuentra activado`,
      };
    }
    await this.rolModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El rol se activo correctamente`,
    };
  }

  async UPDATE_ROL_DESACTIVAR(sendParams: AccionDto) {
    console.log(sendParams);
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un rol a desactivar',
      };
    }

    const result_update = await this.rolModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El rol no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.rolModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El registro se desactivo correctamente`,
    };
  }
}
