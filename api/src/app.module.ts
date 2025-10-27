/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeSystemModule } from './roles/roles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TipoDocumentosModule } from './tipo-documentos/tipo-documentos.module';
import { PaisesModule } from './paises/paises.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/sistemas'),
    TypeSystemModule,
    TipoDocumentosModule,
    PaisesModule,
  ],
})
export class AppModule {}
