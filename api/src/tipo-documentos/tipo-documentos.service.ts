import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AccionDtoTipoDocumento } from 'src/dto/tipoDocumentos.dto.ts/tipoDocumentoAccion.dto';
import { tipoDocumentoCreateDto } from 'src/dto/tipoDocumentos.dto.ts/tipoDocumentoCreate.dto';
import { tipoDocumentoGetDto } from 'src/dto/tipoDocumentos.dto.ts/tipoDocumentoGet.dto';
import { tipoDocumentoUpdateDto } from 'src/dto/tipoDocumentos.dto.ts/tipoDocumentoUpdate.dto';
import { tipoDocumentoUpdateIdtDto } from 'src/dto/tipoDocumentos.dto.ts/tipoDocumentoUpdateId.dto';
import { TipoDocumento } from 'src/models/shemas.tipoDocumento';

@Injectable()
export class TipoDocumentosService {
  constructor(
    @InjectModel(TipoDocumento.name)
    private readonly tipoDocumentoModel: Model<TipoDocumento>,
  ) {}

  async GET_ROL(get: tipoDocumentoGetDto) {
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
      result: await this.tipoDocumentoModel.find({
        $or: or,
      }),
    };
  }

  async CREATE_ROL(post: tipoDocumentoCreateDto) {
    const resultado_buscado = await this.tipoDocumentoModel.findOne({
      nombre: post.nombre?.toUpperCase(),
    });

    if (resultado_buscado) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El nombre del tipo de documento ya existe',
      };
    }

    if (!post.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Tiene que ingresar el nombre del tipo de documento ',
      };
    }
    const resultado = await this.tipoDocumentoModel.create({
      nombre: post.nombre.toUpperCase(),
    });

    resultado.save();
    return {
      status: HttpStatus.CREATED,
      message: 'tipo de documento  creado correctamente',
    };
  }

  async UPDATE_ROL(
    roleUpdateID: tipoDocumentoUpdateIdtDto,
    update: tipoDocumentoUpdateDto,
  ) {
    console.log(roleUpdateID);
    if (!roleUpdateID.id) {
      return {
        status: HttpStatus.CONFLICT,
        message:
          'Seleccione el tipo de documento  del sistema a modificar el nombre',
      };
    }

    if (!update.nombre) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Ingrese el nombre del tipo de documento  a actualizar',
      };
    }

    const result_update = await this.tipoDocumentoModel.findOne({
      $and: [
        { nombre: update.nombre.toUpperCase() },
        { _id: { $ne: roleUpdateID.id } },
      ],
    });

    if (result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message:
          'El nombre a modificar del tipo de documento  ya se encuentra registrado',
      };
    }
    await this.tipoDocumentoModel
      .updateOne(
        { _id: roleUpdateID.id },
        { $set: { nombre: update.nombre?.toString().trim().toUpperCase() } },
      )
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'tipo de documento  actualizado correctamente',
    };
  }

  async UPDATE_ROL_ACTIVAR(sendParams: AccionDtoTipoDocumento) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un tipo de documento  de sistemas a activar',
      };
    }

    const result_update = await this.tipoDocumentoModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El tipo de documento  no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El tipo de documento  que trata de activar ya se encuentra activado`,
      };
    }
    await this.tipoDocumentoModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El tipo de documento  se activo correctamente`,
    };
  }

  async UPDATE_ROL_DESACTIVAR(sendParams: AccionDtoTipoDocumento) {
    console.log(sendParams);
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un tipo de documento  a desactivar',
      };
    }

    const result_update = await this.tipoDocumentoModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El tipo de documento  no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El tipo de documento  que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.tipoDocumentoModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El tipo de documento  se desactivo correctamente`,
    };
  }
}
