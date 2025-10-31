import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from 'src/models/schemas.ciudad';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { ProvinciaModule } from 'src/provincia/provincia.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ciudad.name, schema: CiudadSchema }]),
    ProvinciaModule,
  ],
  providers: [CiudadService],
  controllers: [CiudadController],
  exports: [CiudadService],
})
export class CiudadModule {}
