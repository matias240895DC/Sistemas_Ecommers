import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class tipoDocumentoUpdateDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @IsOptional()
  nombre?: string;
}
