import { IsMongoId, IsInt, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartItemDto {
  @IsMongoId()
  readonly product: Types.ObjectId;

  @IsInt()
  @Min(1)
  readonly quantity: number;
}
