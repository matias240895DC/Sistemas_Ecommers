import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class rolCreateDto {
  @ApiProperty({ example: 'admin' })
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  nombre?: string;
}
