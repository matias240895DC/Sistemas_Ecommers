import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class rolUpdateDto {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  nombre: string;
}
