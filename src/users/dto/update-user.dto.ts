// src/users/dto/update-user.dto.ts

import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly address?: AddressDto;
}
