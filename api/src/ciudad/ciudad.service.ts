import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { CiudadGetDto } from 'src/dto/ciudad/ciudadGet.dto';
import { Ciudad } from 'src/models/schemas.ciudad';
import { ProvinciaService } from '../provincia/provincia.service';
import { AccionDtoCiudad } from 'src/dto/ciudad/ciudadAccion.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectModel(Ciudad.name)
    private readonly ciudadModel: Model<Ciudad>,
    private readonly provinciaService: ProvinciaService, // 👈 sin @Inject()
  ) {}

  async GET_CIUDAD(get: CiudadGetDto) {
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

    if (get?.provincia && Types.ObjectId.isValid(get.provincia)) {
      or.push({ provincia: new Types.ObjectId(get.provincia) });
    }

    return {
      status: HttpStatus.OK,
      result: await this.ciudadModel
        .find({
          $or: or,
        })
        .populate('provincia')
        .exec(),
    };
  }

  async CREATE_CIUDAD() {
    const resultado_provincia = await this.provinciaService.GET_PROVINCIAS({});
    if (!resultado_provincia || !resultado_provincia.result) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Error no se encontraron provincias',
      };
    }

    for (let i = 0; i < resultado_provincia.result.length; i++) {
      const elemento = resultado_provincia.result[i];

      let offset = 0;
      const max = 500; // máximo por llamada
      let total = 0;

      do {
        try {
          const nombre_provincias = elemento.nombre
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

          const response = await axios.get(
            `https://apis.datos.gob.ar/georef/api/v2.0/localidades?provincia=${nombre_provincias}&max=${max}&inicio=${offset}`,
          );

          const localidades = response.data.localidades;
          total = response.data.cantidad; // total de localidades en la provincia

          for (const loc of localidades) {
            await this.ciudadModel.create({
              nombre: loc.nombre,
              provincia: elemento._id,
            });
          }

          offset += max;
        } catch (error) {
          console.error(
            'Error cargando localidades de',
            elemento.nombre,
            error.message,
          );
          break;
        }
      } while (offset < total);
    }

    return {
      status: HttpStatus.CREATED,
      message: 'Ciudades agregadas correctamente',
    };
  }

  async UPDATE_PAIS_ACTIVAR(sendParams: AccionDtoCiudad) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione una ciudad de sistemas a activar',
      };
    }

    const result_update = await this.ciudadModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'La ciudad no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `La ciudad que trata de activar ya se encuentra activado`,
      };
    }
    await this.ciudadModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `La ciudad se activo correctamente`,
    };
  }

  async UPDATE_PAIS_DESACTIVAR(sendParams: AccionDtoCiudad) {
    console.log(sendParams);
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione una ciudad a desactivar',
      };
    }

    const result_update = await this.ciudadModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'La ciudad no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `La ciudad que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.ciudadModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `La ciudad se desactivo correctamente`,
    };
  }
}
