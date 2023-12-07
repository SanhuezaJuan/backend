import { MinLength, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
