import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class provinciasCreateDto {
  @ApiProperty({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68f169baeeb50255e7134e41',
  })
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  @IsOptional()
  idPais?: string;
}
