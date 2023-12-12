import { ObjectId } from 'mongoose';

export class CreateCartItemDto {
  readonly product: ObjectId;
  readonly quantity: number;
}
