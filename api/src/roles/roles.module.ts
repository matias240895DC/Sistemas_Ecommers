import { Module } from '@nestjs/common';
import { RolController } from './roles.controller';
import { RolService } from './roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, rolSchema } from 'src/models/schemas.rol';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: rolSchema }])],
  controllers: [RolController],
  providers: [RolService],
})
export class TypeSystemModule {}
