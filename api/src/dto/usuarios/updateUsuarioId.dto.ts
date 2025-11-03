import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class usuarioUpdateIdtDto {
  @ApiProperty({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68f169baeeb50255e7134e41',
  })
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  @IsNotEmpty({ message: 'El id no puede estar vacio' })
  id: string;
}
