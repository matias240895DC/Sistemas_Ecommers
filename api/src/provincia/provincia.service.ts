import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { AccionDtoProvincia } from 'src/dto/provincias/provinciasAccion.dto';
import { ProvinciasGetDto } from 'src/dto/provincias/provinciasGet.dto';
import { provinciasCreateDto } from 'src/dto/provincias/ProvinciasPost.dto';
import { Provincias } from 'src/models/schemas.provincias';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectModel(Provincias.name)
    private readonly provinciaModel: Model<Provincias>,
  ) {}

  async GET_PROVINCIAS(get: ProvinciasGetDto) {
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

    if (get?.pais) {
      or.push({ pais: get.pais.toString().trim().toUpperCase() });
    }

    return {
      status: HttpStatus.OK,
      result: await this.provinciaModel
        .find({
          $or: or,
        })
        .populate('pais')
        .exec(),
    };
  }

  async CREATE_PROVINCIAS(post: provinciasCreateDto) {
    const resultado_provincia = await axios.get(
      'https://apis.datos.gob.ar/georef/api/provincias',
    );

    for (
      let index = 0;
      index < resultado_provincia.data.provincias.length;
      index++
    ) {
      const element = resultado_provincia.data.provincias[index];
      const resultado_buscado = await this.provinciaModel
        .findOne({
          nombre: element.nombre?.toUpperCase(),
        })
        .exec();
      if (!resultado_buscado) {
        const resultado_provincia_creado = await this.provinciaModel.create({
          nombre: element.nombre.toUpperCase(),
          pais: post.idPais,
        });

        resultado_provincia_creado.save();
      }
    }

    return {
      status: HttpStatus.CREATED,
      message: 'Provincias Cargado Correctamente',
    };
  }

  async UPDATE_PROVINCIAS_ACTIVAR(sendParams: AccionDtoProvincia) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione una provincia  de sistemas a activar',
      };
    }

    const result_update = await this.provinciaModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'La provincia  no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `La provincia  que trata de activar ya se encuentra activado`,
      };
    }
    await this.provinciaModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `La provincia  se activo correctamente`,
    };
  }

  async UPDATE_PROVINCIAS_DESACTIVAR(sendParams: AccionDtoProvincia) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione una provincia  a desactivar',
      };
    }

    const result_update = await this.provinciaModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'La provincia  no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `La provincia  que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.provinciaModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `La provincia
        se desactivo correctamente`,
    };
  }
}
