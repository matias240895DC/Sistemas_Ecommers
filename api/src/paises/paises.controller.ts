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
import { paisCreateDto } from 'src/dto/paises/paisesCreate.dto';
import { PaisGetDto } from 'src/dto/paises/paisesGet.dto';
import { CleanIdInterceptor } from 'src/midderware/pipe';
import { PaisesService } from './paises.service';
import { AccionDtoPais } from 'src/dto/paises/paisesAccion.dto';
import { PaisUpdateId } from 'src/dto/paises/paisesUpdateId.dto';
import { paisUpdateDto } from 'src/dto/paises/paisesUpdate.dto';

@Controller('paises')
@ApiTags('Tipo de paises para el sistemas')
export class PaisesController {
  constructor(private readonly PaisServices: PaisesService) {}

  @ApiOperation({
    summary: 'Filtrar paises del sistema de gimnacios',
  })
  @ApiResponse({
    status: 200,
    description:
      'Respuesta exitosa con distintos escenarios de lista de paises',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Pais'),
  })
  @ApiQuery({
    name: 'query',
    type: PaisGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de paises del gimnacio ' })
  @Get()
  filterRol(@Query() get: PaisGetDto) {
    try {
      return this.PaisServices.GET_PAIS(get);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Crear un paise del sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'pais  creado correctamente',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Pais'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el pais no se pudo crear',
    content: CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE('Pais', [
      'El nombre',
      'La moneda',
    ]),
  })
  @ApiBody({
    type: paisCreateDto,
  })
  @Post()
  postRol(@Body() post: paisCreateDto) {
    try {
      return this.PaisServices.CREATE_PAIS(post);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({
    summary: 'Actualizar pais del sistema del gimnacio por ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del pais  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'pais actualizado correctamente',
    content: CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE('Pais'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el pais no se pudo modificar',
    content: CONTENEDOR_DOC_TABLA_PARAMETRO_ERROR_MULTIPLE('Pais', [
      'nombre',
      'moneda',
      'id',
    ]),
  })
  @Patch(':id')
  @UseInterceptors(CleanIdInterceptor)
  patchRol(@Param() paisUpdateID: PaisUpdateId, @Body() patch: paisUpdateDto) {
    try {
      return this.PaisServices.UPDATE_PAIS(paisUpdateID, patch);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Activar pais' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del pais  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Pais activado correctamente',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Pais'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el pais no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Pais'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDtoPais) {
    try {
      return this.PaisServices.UPDATE_PAIS_ACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar pais' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del pais  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Pais desactivado correctamente',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Pais'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el pais no se pudo desactivar',
    content: CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Pais'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchRolDesactivar(@Param() sendParams: AccionDtoPais) {
    try {
      return this.PaisServices.UPDATE_PAIS_DESACTIVAR(sendParams);
    } catch (error) {
      console.log(error);
    }
  }
}
