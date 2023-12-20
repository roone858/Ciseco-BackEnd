// src/wishlist/dto/remove-from-wishlist.dto.ts

import { IsMongoId } from 'class-validator';

export class RemoveFromWishlistDto {
  @IsMongoId({ message: 'Invalid product ID' })
  readonly productId: string;
}
