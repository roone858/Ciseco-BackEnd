export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
