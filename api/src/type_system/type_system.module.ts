import { Module } from '@nestjs/common';
import { TypeSystemController } from './type_system.controller';
import { TypeSystemService } from './type_system.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeSystem, TypeSystemSchema } from 'src/models/schemas.type_system';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TypeSystem.name, schema: TypeSystemSchema },
    ]),
  ],
  controllers: [TypeSystemController],
  providers: [TypeSystemService],
})
export class TypeSystemModule {}
