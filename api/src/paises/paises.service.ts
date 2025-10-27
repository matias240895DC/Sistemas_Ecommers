import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccionDtoPais } from 'src/dto/paises/paisesAccion.dto';
import { paisCreateDto } from 'src/dto/paises/paisesCreate.dto';
import { PaisGetDto } from 'src/dto/paises/paisesGet.dto';
import { paisUpdateDto } from 'src/dto/paises/paisesUpdate.dto';
import { PaisUpdateId } from 'src/dto/paises/paisesUpdateId.dto';
import { Pais } from 'src/models/schemas.paises';

@Injectable()
export class PaisesService {
  constructor(
    @InjectModel(Pais.name)
    private readonly paisModel: Model<Pais>,
  ) {}

  async GET_PAIS(get: PaisGetDto) {
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
      result: await this.paisModel.find({
        $or: or,
      }),
    };
  }

  async CREATE_PAIS(post: paisCreateDto) {
    const resultado_buscado = await this.paisModel.findOne({
      nombre: post.nombre?.toUpperCase(),
    });

    if (resultado_buscado) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre del pais ya existe',
      };
    }

    if (!post.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Tiene que ingresar el nombre del pais',
      };
    }

    if (!post.moneda) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Tiene que ingresar el simbolo de la moneda del pais',
      };
    }
    const resultado = await this.paisModel.create({
      nombre: post.nombre.toUpperCase(),
      moneda: post.moneda.toUpperCase(),
    });

    resultado.save();
    return {
      status: HttpStatus.CREATED,
      message: 'pais creado correctamente',
    };
  }

  async UPDATE_PAIS(paiseUpdateID: PaisUpdateId, update: paisUpdateDto) {
    if (!paiseUpdateID.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione el pais del sistema a modificar',
      };
    }

    if (!update.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Ingrese el nombre del pais a actualizar',
      };
    }

    if (!update.moneda) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Tiene que ingresar el simbolo de la moneda del pais',
      };
    }

    const result_update = await this.paisModel.findOne({
      $and: [
        { nombre: update.nombre.toUpperCase() },
        { _id: { $ne: paiseUpdateID.id } },
      ],
    });

    if (result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre a modificar del pais  ya se encuentra registrado',
      };
    }
    await this.paisModel
      .updateOne(
        { _id: paiseUpdateID.id },
        {
          $set: {
            nombre: update.nombre?.toString().trim().toUpperCase(),
            moneda: update.moneda?.toString().trim().toUpperCase(),
          },
        },
      )
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'pais actualizado correctamente',
    };
  }

  async UPDATE_PAIS_ACTIVAR(sendParams: AccionDtoPais) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un pais de sistemas a activar',
      };
    }

    const result_update = await this.paisModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El pais no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El pais que trata de activar ya se encuentra activado`,
      };
    }
    await this.paisModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El pais se activo correctamente`,
    };
  }

  async UPDATE_PAIS_DESACTIVAR(sendParams: AccionDtoPais) {
    console.log(sendParams);
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un pais a desactivar',
      };
    }

    const result_update = await this.paisModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El pais no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El pais que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.paisModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El pais se desactivo correctamente`,
    };
  }
}
