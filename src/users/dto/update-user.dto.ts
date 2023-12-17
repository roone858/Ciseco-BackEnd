export class UpdateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly image: string;
  readonly address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
