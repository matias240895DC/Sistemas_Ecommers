import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class paisCreateDto {
  @ApiProperty({ example: 'Argentina' })
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  nombre?: string;

  @ApiProperty({ example: '$' })
  @IsOptional()
  @IsNotEmpty({ message: 'Ingrese el simbolo de la moneda' })
  moneda?: string;
}
