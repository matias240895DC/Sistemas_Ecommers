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
import { TipoDocumentosService } from './tipo-documentos.service';
import { CleanIdInterceptor } from 'src/midderware/pipe';
import { AccionDtoTipoDocumento } from 'src/dto/tipoDocumentos/tipoDocumentoAccion.dto';
import { tipoDocumentoUpdateIdtDto } from 'src/dto/tipoDocumentos/tipoDocumentoUpdateId.dto';
import { tipoDocumentoUpdateDto } from 'src/dto/tipoDocumentos/tipoDocumentoUpdate.dto';
import { tipoDocumentoCreateDto } from 'src/dto/tipoDocumentos/tipoDocumentoCreate.dto';
import { tipoDocumentoGetDto } from 'src/dto/tipoDocumentos/tipoDocumentoGet.dto';
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
} from 'src/doc/doc.tabla.parametro';

@Controller('tipoDocumentos')
@ApiTags('Tipo de documento')
export class TipoDocumentosController {
  constructor(private readonly TipoDocumentosServices: TipoDocumentosService) {}

  @ApiOperation({
    summary: 'Filtrar un tipo de documento  del sistema de gimnacios',
  })
  @ApiResponse({
    status: 200,
    description: 'Respuesta exitosa con distintos escenarios de lista de roles',
    content: CONTENERDOR_DOC_FILTER_TABLA_PARAMETRO_GET('Tipo de documento'),
  })
  @ApiQuery({
    name: 'query',
    type: tipoDocumentoGetDto,
    required: false,
  })
  @ApiOperation({ summary: 'Obtener listado de tipos de documentos ' })
  @Get()
  filterRol(@Query() get: tipoDocumentoGetDto) {
    try {
      return this.TipoDocumentosServices.GET_TiPO_DOCUMENTO(get);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Crear un rol del sistema de gimnacios' })
  @ApiResponse({
    status: 201,
    description: 'tipo de documento  creado correctamente',
    content:
      CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_CORRECTAMENTE('Tipo de documento'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el tipo de documento  no se pudo crear',
    content: CONTENEDOR_DOC_CREATE_TABLA_PARAMETRO_ERROR('Tipo de documento'),
  })
  @ApiBody({
    type: tipoDocumentoCreateDto,
  })
  @Post()
  postRol(@Body() post: tipoDocumentoCreateDto) {
    try {
      return this.TipoDocumentosServices.CREATE_TiPO_DOCUMENTO(post);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({
    summary: 'Actualizar tipo de documento  del sistema del gimnacio por ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del tipo de documento  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'tipo de documento actualizado correctamente',
    content:
      CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_CORRECTAMENTE('Tipo de documento'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el tipo de documento no se pudo modificar',
    content: CONTENEDOR_DOC_UPDATE_TABLA_PARAMETRO_ERROR('Tipo de documento'),
  })
  @Patch(':id')
  @UseInterceptors(CleanIdInterceptor)
  patchRol(
    @Param() roleUpdateID: tipoDocumentoUpdateIdtDto,
    @Body() patch: tipoDocumentoUpdateDto,
  ) {
    try {
      return this.TipoDocumentosServices.UPDATE_TiPO_DOCUMENTO(
        roleUpdateID,
        patch,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Activar tipo de documento ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del tipo de documento  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'tipo de documento  activado correctamente',
    content:
      CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE('Tipo de documento'),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el tipo de documento  no se pudo activar',
    content: CONTENEDOR_DOC_ACTIVAR_TABLA_PARAMETRO_ERROR('Tipo de documento'),
  })
  @Patch('activar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchTypeSystemActivar(@Param() sendParams: AccionDtoTipoDocumento) {
    try {
      return this.TipoDocumentosServices.UPDATE_TiPO_DOCUMENTO_ACTIVAR(
        sendParams,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: 'Desactivar tipo de documento ' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del tipo de documento  (formato MongoID)',
    example: '68f169baeeb50255e7134e41',
    schema: { type: 'string' },
  })
  @ApiResponse({
    status: 202,
    description: 'Tipo de documento  desactivado correctamente',
    content:
      CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_CORRECTAMENTE(
        'Tipo de documento',
      ),
  })
  @ApiResponse({
    status: 409,
    description: 'Cuando el tipo de documento  no se pudo desactivar',
    content:
      CONTENEDOR_DOC_DESACTIVAR_TABLA_PARAMETRO_ERROR('Tipo de documento'),
  })
  @Patch('desactivar/:id')
  @UseInterceptors(CleanIdInterceptor)
  patchRolDesactivar(@Param() sendParams: AccionDtoTipoDocumento) {
    try {
      return this.TipoDocumentosServices.UPDATE_TiPO_DOCUMENTO_DESACTIVAR(
        sendParams,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
