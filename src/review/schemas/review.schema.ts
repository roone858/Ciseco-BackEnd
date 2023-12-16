import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ type: String, ref: 'User', required: true })
  user: string;

  @Prop({ type: String, ref: 'Product', required: true })
  product: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rate: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
