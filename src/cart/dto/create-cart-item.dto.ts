import { IsMongoId, IsInt, Min, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsMongoId({ message: 'Invalid product ID' })
  readonly productId: string;

  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  readonly quantity: number;

  @IsNumber({}, { message: 'Subtotal must be a number' })
  readonly subtotal: number;
}
