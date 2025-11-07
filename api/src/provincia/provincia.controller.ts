import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
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
  CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE,
  CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR,
  CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET,
} from 'src/doc/doc.tabla.parametro';
import { ProvinciasGetDto } from 'src/dto/provincias/provinciasGet.dto';
import { ProvinciaService } from './provincia.service';
import { provinciasCreateDto } from 'src/dto/provincias/ProvinciasPost.dto';
import { CleanIdInterceptor } from 'src/midderware/pipe';
import { AccionDtoProvincia } from 'src/dto/provincias/provinciasAccion.dto';

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
  @ApiOperation({ summary: 'Activar Provincia ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la provincia  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Provincia activado correctamente',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Provincia'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando la provincia  no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Provincia'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDtoProvincia) {
    try {
      return this.ProvinciasServices.UPDATE_PROVINCIAS_ACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar provincia ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la provincia  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'provincia desactivado correctamente',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Pais'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando la provincia  no se pudo desactivar',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Provincia'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchRolDesactivar(@Param() sendParams: AccionDtoProvincia) {
    try {
      return this.ProvinciasServices.UPDATE_PROVINCIAS_DESACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }
}
