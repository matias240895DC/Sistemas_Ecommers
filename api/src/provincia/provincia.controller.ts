import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR,
  CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET,
} from 'src/doc/doc.tabla.parametro';
import { ProvinciasGetDto } from 'src/dto/ciudad/provinciasGet.dto';
import { ProvinciaService } from './provincia.service';
import { provinciasCreateDto } from 'src/dto/ciudad/ProvinciasPost.dto';

@Controller('provincia')
@ApiTags('Provincias')
export class ProvinciaController {
  constructor(private readonly ProvinciasServices: ProvinciaService) {}

  @ApiOperation({
    summary: 'Filtrar provincia del sistema de gimnacios',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta exitosa con distintos escenarios de provincias',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Provincias'),
  })
  @ApiQuery({
    name: 'query',
    type: ProvinciasGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de provincias ' })
  @Get()
  filterRol(@Query() get: ProvinciasGetDto) {
    try {
      return this.ProvinciasServices.GET_PROVINCIAS(get);
    } catch (error) {
      console.log(error);
    }
  }
  @ApiOperation({ summary: 'Crear una provincia del sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'provincias  creado correctamente',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Provincias'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el provincias  no se pudo crear',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR('Tipo de documento'),
  })
  @ApiQuery({
    name: 'query',
    type: ProvinciasGetDto,
    required: false,
  })
  @Get('crear')
  postRol(@Query() get: provinciasCreateDto) {
    try {
      return this.ProvinciasServices.CREATE_PROVINCIAS(get);
    } catch (error) {
      console.log(error);
    }
  }
}
