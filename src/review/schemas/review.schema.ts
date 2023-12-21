import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rate: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
