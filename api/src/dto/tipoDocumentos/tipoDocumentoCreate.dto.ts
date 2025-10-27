import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class tipoDocumentoCreateDto {
  @ApiProperty({ example: 'Dni' })
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  nombre?: string;
}
