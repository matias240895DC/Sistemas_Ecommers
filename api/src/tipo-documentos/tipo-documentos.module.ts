import { Module } from '@nestjs/common';
import { TipoDocumentosController } from './tipo-documentos.controller';
import { TipoDocumentosService } from './tipo-documentos.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TipoDocumento,
  tipoDocumentoSchema,
} from 'src/models/shemas.tipoDocumento';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TipoDocumento.name, schema: tipoDocumentoSchema },
    ]),
  ],
  controllers: [TipoDocumentosController],
  providers: [TipoDocumentosService],
})
export class TipoDocumentosModule {}
