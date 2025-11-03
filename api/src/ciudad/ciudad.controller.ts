import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET,
} from 'src/doc/doc.tabla.parametro';
import { AccionDtoCiudad } from 'src/dto/ciudad/ciudadAccion.dto';
import { CiudadGetDto } from 'src/dto/ciudad/ciudadGet.dto';
import { CleanIdInterceptor } from 'src/midderware/pipe';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly CiudadService: CiudadService) {}

  @ApiOperation({
    summary: 'Filtrar ciudad del sistema de gimnacios',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta exitosa con distintos escenarios de ciudad',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Ciudad'),
  })
  @ApiQuery({
    name: 'query',
    type: CiudadGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de ciudad ' })
  @Get()
  filterRol(@Query() get: CiudadGetDto) {
    try {
      return this.CiudadService.GET_CIUDAD(get);
    } catch (error) {
      console.log(error);
    }
  }
  @ApiOperation({ summary: 'Crear una ciudad para el sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'ciudad  creado correctamente',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Ciudad'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando la ciudad  no se pudo crear',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR('Ciudad'),
  })
  @Get('crear')
  postRol() {
    try {
      return this.CiudadService.CREATE_CIUDAD();
    } catch (error) {
      console.log(error);
    }
  }
  @ApiOperation({ summary: 'Activar Ciudad ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la ciudad  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Ciudad activado correctamente',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Ciudad'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando la ciudad no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Ciudad'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDtoCiudad) {
    try {
      return this.CiudadService.UPDATE_PAIS_ACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar ciudad' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la ciudad  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Ciudad desactivado correctamente',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Ciudad'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando la ciudad  no se pudo desactivar',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Ciudad'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchRolDesactivar(@Param() sendParams: AccionDtoCiudad) {
    try {
      return this.CiudadService.UPDATE_PAIS_DESACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }
}
