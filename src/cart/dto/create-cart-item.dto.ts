import mongoose from 'mongoose';

export class CreateCartItemDto {
  readonly product: mongoose.Schema.Types.ObjectId;
  readonly quantity: number;
}
