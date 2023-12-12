// review.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductDocument } from 'src/products/schemas/product.schema';
import { UserDocument } from 'src/users/schemas/user.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: String, ref: 'User', required: true })
  user: UserDocument;

  @Prop({ type: String, ref: 'Product', required: true })
  product: ProductDocument;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rate: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
