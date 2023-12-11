// review.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from './user.schema';
import { ProductDocument } from './product.schema';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: String, ref: 'User', required: true })
  user_id: UserDocument;

  @Prop({ type: String, ref: 'Product', required: true })
  product_id: ProductDocument;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rate: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
