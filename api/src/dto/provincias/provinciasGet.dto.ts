import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class ProvinciasGetDto {
  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68f169baeeb50255e7134e41',
  })
  @IsOptional()
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  @IsNotEmpty({ message: 'El id no puede estar vacio' })
  id?: string;

  @ApiPropertyOptional({ description: 'nombre de la provincia' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
  })
  @IsNotEmpty({ message: 'El id del pais no puede estar vacio' })
  @IsOptional()
  pais?: string;
}
