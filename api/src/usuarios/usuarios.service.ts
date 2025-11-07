import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { encriptar_password } from 'src/config/encriptarPassword/encript';
import { UsuarioGetDto } from 'src/dto/usuarios/getUsuarios.dto';
import { UsuarioPostDto } from 'src/dto/usuarios/postUsuario.dto';
import { UsuarioUpdateDto } from 'src/dto/usuarios/updateUsuario.dto';
import { usuarioUpdateIdtDto } from 'src/dto/usuarios/updateUsuarioId.dto';
import { AccionDtoUser } from 'src/dto/usuarios/usuarioAccion.dto';
import { CREATE_OBJECT_UPDATE, paginator } from 'src/global/auxiliar';
import {
  CREATE_DATO_SEARCH_OR,
  CREATE_DATO_VALIDATE,
  UPDATE_DATO_VALIDATE,
  VALIDAR_DATOS_EXISTENCIA,
} from 'src/global/validators';
import { Usuarios } from 'src/models/schemas.usuarios';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly usuarioModel: Model<Usuarios>,
  ) {}
  async CREATE_USUARIO(post: UsuarioPostDto) {
    const data_validar = CREATE_DATO_VALIDATE(post, [
      'usuario',
      'email',
      'telefono',
      'numeroDocumento',
    ]);
    const resultado_buscado = await VALIDAR_DATOS_EXISTENCIA(
      this.usuarioModel,
      data_validar,
    );

    if (resultado_buscado.error.length > 0) {
      return {
        status: resultado_buscado.status,
        error: resultado_buscado.error,
      };
    }
    const errores: Array<string> = [];
    for (const key in post) {
      if (!key || !post[key]) {
        errores.push(`${key} es obligatorio`);
      }
    }

    if (errores.length > 0) {
      return { status: HttpStatus.CONFLICT, error: errores };
    }
    const resultado = await this.usuarioModel.create({
      nombre: post.nombre.toUpperCase(),
      apellido: post.apellido.toUpperCase(),
      ciudad: post.ciudad,
      codigoArea: post.codigoArea,
      email: post.email.toUpperCase(),
      numeroDocumento: post.numeroDocumento.toUpperCase(),
      pais: post.pais,
      provincias: post.provincia,
      rol: post.rol,
      telefono: post.telefono,
      tipoDocumento: post.tipoDocumento,
      usuario: post.usuario.toUpperCase(),
      pass: await encriptar_password(post.pass),
    });

    resultado.save();
    return {
      status: HttpStatus.CREATED,
      message: 'usuario creado correctamente',
    };
  }
  async GET_USUARIO(get: UsuarioGetDto) {
    const resultPaginador = paginator(Number(get.limit), Number(get.offset));
    console.log(resultPaginador);
    console.log('QUERY SEARCH:', CREATE_DATO_SEARCH_OR(get));

    const result = await this.usuarioModel
      .find({
        $or: CREATE_DATO_SEARCH_OR(get),
      })
      .populate([
        { path: 'pais' },
        { path: 'provincias' },
        { path: 'ciudad' },
        { path: 'rol' },
        { path: 'tipoDocumento' },
      ])
      .skip(resultPaginador.skip)
      .limit(Number(resultPaginador.limit))
      .exec();
    return {
      status: HttpStatus.OK,
      result,
    };
  }

  async UPDATE_USER_ACTIVAR(sendParams: AccionDtoUser) {
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un usuario de sistemas a activar',
      };
    }

    const result_update = await this.usuarioModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El usuario no se encuentra registrado',
      };
    }

    if (result_update.estado === true) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro que trata de activar ya se encuentra activado`,
      };
    }
    await this.usuarioModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: true } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El registro se activo correctamente`,
    };
  }

  async UPDATE_USER_DESACTIVAR(sendParams: AccionDtoUser) {
    console.log(sendParams);
    if (!sendParams.id) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Seleccione un usuario a desactivar',
      };
    }

    const result_update = await this.usuarioModel.findOne({
      _id: sendParams.id,
    });

    if (!result_update) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'El usuario no se encuentra registrado',
      };
    }

    if (result_update.estado === false) {
      return {
        status: HttpStatus.CONFLICT,
        message: `El registro que trata desactivar ya se encuentra desactivado`,
      };
    }
    await this.usuarioModel
      .updateOne({ _id: sendParams.id }, { $set: { estado: false } })
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: `El registro se desactivo correctamente`,
    };
  }

  async UPDATE_USUARIO(
    usuarioUpdateID: usuarioUpdateIdtDto,
    update: UsuarioUpdateDto,
  ) {
    const result_update = await UPDATE_DATO_VALIDATE(
      update,
      usuarioUpdateID,
      ['usuario', 'email', 'numeroDocumento', 'telefono'],
      this.usuarioModel,
    );
    if (result_update.length > 0) {
      return {
        status: HttpStatus.CONFLICT,
        error: result_update,
      };
    }
    await this.usuarioModel
      .updateOne(
        { _id: usuarioUpdateID.id },
        {
          $set: await CREATE_OBJECT_UPDATE(update),
        },
      )
      .exec();
    return {
      status: HttpStatus.ACCEPTED,
      message: 'usuario actualizado correctamente',
    };
  }
}
