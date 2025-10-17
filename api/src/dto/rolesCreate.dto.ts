import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class rolCreateDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  nombre: string;
}
