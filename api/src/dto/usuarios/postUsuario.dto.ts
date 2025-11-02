import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UsuarioPostDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsNotEmpty({ message: 'El nombre del cliente no puede estar vacio' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @IsNotEmpty({ message: 'El apellido del cliente no puede estar vacio' })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'ObjectId (24 hex) de la provincia' })
  @IsNotEmpty({ message: 'El id de la provincia no puede estar vacio' })
  @IsString()
  provincia: string;

  @ApiProperty({ description: 'ObjectId (24 hex) de la ciudad' })
  @IsNotEmpty({ message: 'La id de ciudad no puede estar vacio' })
  @IsString()
  ciudad: string;

  @ApiProperty({ description: 'ObjectId (24 hex) del país' })
  @IsNotEmpty({ message: 'El id de pais no puede estar vacio' })
  @IsString()
  pais: string;

  @ApiProperty({ description: 'Ingrese la contraseña' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacio' })
  @IsString()
  @IsStrongPassword()
  pass: string;

  @ApiProperty({ description: 'ObjectId (24 hex) del rol' })
  @IsNotEmpty({ message: 'El id de rol no puede estar vacio' })
  @IsString()
  rol: string;

  @ApiProperty({ description: 'Tipo de documento' })
  @IsNotEmpty({ message: 'El id de tipoDocumento no puede estar vacio' })
  @IsString()
  tipoDocumento: string;

  @ApiProperty({ description: 'Nombre de usuario del cliente' })
  @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacio' })
  @IsString()
  usuario: string;

  @ApiProperty({ description: 'Email del cliente' })
  @IsNotEmpty({ message: 'El email del cliente no puede estar vacio' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Código de área del cliente' })
  @IsNotEmpty({ message: 'El código de área no puede estar vacio' })
  @IsString()
  codigoArea: string;

  @ApiProperty({ description: 'Teléfono del cliente' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacio' })
  @IsString()
  telefono: string;

  @ApiProperty({ description: 'Número de documento del cliente' })
  @IsNotEmpty({ message: 'El número de documento no puede estar vacio' })
  @IsString()
  numeroDocumento: string;
}
