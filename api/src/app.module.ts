/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeSystemModule } from './type_system/type_system.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/sistemas'),
    TypeSystemModule,
  ],
})
export class AppModule {}
