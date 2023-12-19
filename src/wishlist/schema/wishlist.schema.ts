// src/wishlist/wishlist.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
export type WishlistDocument = Wishlist & Document;
@Schema()
export class Wishlist extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
