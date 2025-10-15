import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';
// import { Type } from 'class-transformer';

export class typeSystemGetDto {
  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) el',
    example: '68e583a870b68ee7364fd4c1',
  })
  @IsOptional()
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  id?: string;
  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68e583a870b68ee7364fd4c1',
  })
  @IsOptional()
  nombre?: string;
}

export class typeSystemCreateDto {
  @IsNotEmpty()
  nombre: string;
}

export class typeSystemUpdateId {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
