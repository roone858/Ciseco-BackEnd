export class CreateUserDto {
  readonly googleId: string;
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: 'user' | 'admin';
  readonly address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}
