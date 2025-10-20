import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export class rolGetDto {
  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68f169baeeb50255e7134e41',
  })
  @IsOptional()
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  @IsNotEmpty({ message: 'El id no puede estar vacio' })
  id?: string;

  @ApiPropertyOptional({ description: 'nombre del tipo de sistema' })
  @IsOptional()
  nombre?: string;
}
