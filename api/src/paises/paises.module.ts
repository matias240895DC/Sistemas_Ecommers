import { Module } from '@nestjs/common';
import { PaisesController } from './paises.controller';
import { PaisesService } from './paises.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pais, PaisSchema } from 'src/models/schemas.paises';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pais.name, schema: PaisSchema }]),
  ],

  controllers: [PaisesController],
  providers: [PaisesService],
})
export class PaisesModule {}
