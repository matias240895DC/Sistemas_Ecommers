import { Module } from '@nestjs/common';
import {
  Provincias,
  provinciasSchemaDocument,
} from 'src/models/schemas.provincias';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provincias.name, schema: provinciasSchemaDocument },
    ]),
  ],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
})
export class ProvinciaModule {}
