import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TypeSystemService } from './type_system.service';
import {
  typeSystemCreateDto,
  typeSystemGetDto,
  typeSystemUpdateId,
} from 'src/dto/type_system.dto';
import { ParseMongoIdPipe } from 'src/midderware/pipe';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('type-system')
@ApiTags('Tipo de sistemas')
export class TypeSystemController {
  constructor(private readonly typeSystemServices: TypeSystemService) {}
  @Get()
  filterTypeSystem(@Query() get: typeSystemGetDto) {
    try {
      return this.typeSystemServices.GET_TYPE_SYSTEM(get);
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  postTypeSystem(@Body() post: typeSystemCreateDto) {
    try {
      return this.typeSystemServices.CREATE_TYPE_SYSTEM(post);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  patchTypeSystem(
    @Param('id', new ParseMongoIdPipe()) id: string,
    @Body() patch: typeSystemCreateDto,
  ) {
    try {
      return this.typeSystemServices.UPDATE_TYPE_SYSTEM(id, patch);
    } catch (error) {
      console.log(error);
    }
  }
  @Patch('activar/:id')
  patchTypeSystemActivar(@Param('id', new ParseMongoIdPipe()) id: string) {
    try {
      return this.typeSystemServices.UPDATE_TYPE_SYSTEM_ACTIVAR(id);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch('desactivar/:id')
  patchTypeSystemDesactivar(@Param('id', new ParseMongoIdPipe()) id: string) {
    try {
      return this.typeSystemServices.UPDATE_TYPE_SYSTEM_DESACTIVAR(id);
    } catch (error) {
      console.log(error);
    }
  }
}
