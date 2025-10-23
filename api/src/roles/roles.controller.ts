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
import { RolService } from './roles.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { rolGetDto } from 'src/dto/roles/rolesGet.dto';
import { rolCreateDto } from 'src/dto/roles/rolesCreate.dto';
import {
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_ERROR,
  CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET,
} from '../doc/doc.tabla.parametro';
import { rolUpdateDto } from 'src/dto/roles/rolesUpdate.dto';
import { CleanIdInterceptor } from '../midderware/pipe';
import { AccionDto } from 'src/dto/roles/rolesAccion.dto';
import { UpdateIdtDto } from 'src/dto/roles/rolesUpdateId.dto';

@Controller('rol')
@ApiTags('Roles de usuarios')
export class RolController {
  constructor(private readonly rolServices: RolService) {}

  @ApiOperation({ summary: 'Filtrar un rol del sistema de gimnacios' })
  @ApiResponse({
    status: 200,
    description: 'Respuesta exitosa con distintos escenarios de lista de roles',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Rol'),
  })
  @ApiQuery({
    name: 'query',
    type: rolGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de roles' })
  @Get()
  filterRol(@Query() get: rolGetDto) {
    try {
      return this.rolServices.GET_ROL(get);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Crear un rol del sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'Rol creado correctamente',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Rol'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el rol no se pudo crear',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR('Rol'),
  })
  @ApiBody({
    type: rolCreateDto,
  })
  @Post()
  postRol(@Body() post: rolCreateDto) {
    try {
      return this.rolServices.CREATE_ROL(post);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Actualizar rol del sistema del gimnacio por ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del rol (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Rol actualizado correctamente',
    content: CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE('Rol'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el rol no se pudo modificar',
    content: CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_ERROR('Rol'),
  })
  @Patch(':id')
  @UseInterceptors(CleanIdInterceptor)
  patchRol(@Param() roleUpdateID: UpdateIdtDto, @Body() patch: rolUpdateDto) {
    try {
      return this.rolServices.UPDATE_ROL(roleUpdateID, patch);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Activar Rol' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del rol (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Rol activado correctamente',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Rol'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el rol no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Rol'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDto) {
    try {
      return this.rolServices.UPDATE_ROL_ACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar Rol' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del rol (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Rol desactivado correctamente',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Rol'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el rol no se pudo desactivar',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Rol'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchRolDesactivar(@Param() sendParams: AccionDto) {
    try {
      return this.rolServices.UPDATE_ROL_DESACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }
}
