// src/users/dto/create-user.dto.ts

import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;
}

export class CreateUserDto {
  @IsString()
  @IsOptional()
  readonly googleId?: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole; // <-- Use the UserRole enum here

  @IsObject()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly address?: AddressDto;

  @IsOptional()
  addressId: string;
}
