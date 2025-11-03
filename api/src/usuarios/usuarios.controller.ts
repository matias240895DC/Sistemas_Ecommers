import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE,
  CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET,
} from 'src/doc/doc.tabla.parametro';
import { UsuarioPostDto } from 'src/dto/usuarios/postUsuario.dto';
import { UsuariosService } from './usuarios.service';
import { CleanIdInterceptor } from 'src/midderware/pipe';
import { AccionDtoUser } from 'src/dto/usuarios/usuarioAccion.dto';
import { UsuarioGetDto } from 'src/dto/usuarios/getUsuarios.dto';
import { usuarioUpdateIdtDto } from 'src/dto/usuarios/updateUsuarioId.dto';
import { UsuarioUpdateDto } from 'src/dto/usuarios/updateUsuario.dto';

@Controller('usuarios')
@ApiTags('usuarios')
export class UsuariosController {
  constructor(private readonly UsuariosServices: UsuariosService) {}
  @ApiOperation({
    summary: 'Filtrar usuarios del sistema de gimnacios',
  })
  @ApiResponse({
    status: 200,
    description:
      'Respuesta exitosa con distintos escenarios de lista de usuario',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Usuario'),
  })
  @ApiQuery({
    name: 'query',
    type: UsuarioGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de usuarios del gimnacio ' })
  @Get()
  filterPais(@Query() get: UsuarioGetDto) {
    try {
      return this.UsuariosServices.GET_USUARIO(get);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Crear un usuario del sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Usuarios'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el usuario no se pudo crear',
    content: CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE('Usuarios', [
      'nombre',
      'apellido',
      'provincia',
      'ciudad',
      'pais',
      'pass',
      'rol',
      'tipoDocumento',
      'usuario',
      'email',
      'codigoArea',
      'telefono',
      'numeroDocumento',
    ]),
  })
  @ApiBody({
    type: UsuarioPostDto,
  })
  @Post()
  postUsuario(@Body() post: UsuarioPostDto) {
    try {
      return this.UsuariosServices.CREATE_USUARIO(post);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Activar Usuario' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del usuario (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Usuario activado correctamente',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Usuarios'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el usuario no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Usuario'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDtoUser) {
    try {
      return this.UsuariosServices.UPDATE_USER_ACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar usuario' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del usuario (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Usuario desactivado correctamente',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Usuario'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el usuario no se pudo desactivar',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Usuario'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchUsuarioDesactivar(@Param() sendParams: AccionDtoUser) {
    try {
      return this.UsuariosServices.UPDATE_USER_DESACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({
    summary: 'Actualizar usuario del sistema del gimnacio por ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del usuario  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'usuario actualizado correctamente',
    content: CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE('Usuario'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el usuario no se pudo modificar',
    content: CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE('Usuario', [
      'nombre',
      'usuario',
      'pass',
      'apellido',
      'email',
      'codigoArea',
      'telefono',
      'numeroDocumento',
      'tipoDocumento',
      'rol',
      'ciudad',
      'provincias',
      'pais',
      'id',
    ]),
  })
  @Patch(':id')
  @UseInterceptors(CleanIdInterceptor)
  patchPais(
    @Param() usuarioUpdateID: usuarioUpdateIdtDto,
    @Body() patch: UsuarioUpdateDto,
  ) {
    try {
      return this.UsuariosServices.UPDATE_USUARIO(usuarioUpdateID, patch);
    } catch (error) {
      console.log(error);
    }
  }
}
