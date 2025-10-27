import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class paisUpdateDto {
  @ApiProperty({ example: 'Argentina' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  @IsOptional()
  nombre?: string;
  @ApiProperty({ example: '$' })
  @IsOptional()
  @IsNotEmpty({ message: 'Ingrese el simbolo de la moneda' })
  moneda?: string;
}
