import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UsuarioGetDto {
  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
    example: '68f169baeeb50255e7134e41',
  })
  @IsOptional()
  @IsMongoId({ message: 'Id incorrecto no existe en la base de datos' })
  @IsNotEmpty({ message: 'El id no puede estar vacio' })
  id?: string;

  @ApiPropertyOptional({ description: 'nombre del cliente' })
  @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacio' })
  @IsOptional()
  nombre?: string;

  @ApiPropertyOptional({ description: 'apellido del cliente' })
  @IsNotEmpty({ message: 'El apellido del cliente no puede estar vacio' })
  @IsOptional()
  apellido?: string;

  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
  })
  @IsNotEmpty({ message: 'El id de la provincia no puede estar vacio' })
  @IsOptional()
  provincia?: string;

  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
  })
  @IsNotEmpty({ message: 'la id de ciudad no puede estar vacio' })
  @IsOptional()
  ciudad?: string;

  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
  })
  @IsNotEmpty({ message: 'la id de pais no puede estar vacio' })
  @IsOptional()
  pais?: string;

  @ApiPropertyOptional({
    description: 'ObjectId (24 hex) debe ser un id valido',
  })
  @IsNotEmpty({ message: 'la id de rol no puede estar vacio' })
  @IsOptional()
  rol?: string;

  @IsNotEmpty({ message: 'el id de tipoDocumento no puede estar vacio' })
  @IsOptional()
  tipoDocumento?: string;

  @ApiPropertyOptional({ description: 'nombre de usuario del cliente' })
  @IsNotEmpty({
    message: 'El nombre de usuario del cliente no puede estar vacio',
  })
  @IsOptional()
  usuario?: string;

  @ApiPropertyOptional({ description: 'email del cliente' })
  @IsNotEmpty({
    message: 'El email del cliente no puede estar vacio',
  })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'codigo de area del cliente' })
  @IsNotEmpty({
    message: 'El codigo de area del cliente no puede estar vacio',
  })
  @IsOptional()
  codigoArea?: string;

  @ApiPropertyOptional({ description: 'telefono del cliente' })
  @IsNotEmpty({
    message: 'El telefono del cliente no puede estar vacio',
  })
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({ description: 'telefono del cliente' })
  @IsNotEmpty({
    message: 'El numero de documento del cliente no puede estar vacio',
  })
  @IsOptional()
  numeroDocumento?: string;
}
