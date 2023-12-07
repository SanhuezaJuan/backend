import {
  MinLength,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ROLES } from '../../auth/enums/Role.enum';
export class CreateUserDTO {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  username: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'La contraseña debe ser mayor o igual a 8 caracteres',
  })
  password: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsEnum(ROLES)
  role: ROLES;
}
