// src/wishlist/dto/add-to-wishlist.dto.ts

import { IsMongoId } from 'class-validator';

export class AddToWishlistDto {
  @IsMongoId({ message: 'Invalid product ID' })
  readonly productId: string;
}
