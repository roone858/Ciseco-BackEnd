import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class CartItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: string;

  @Prop({ required: true })
  quantity: number;
  subtotal: number;
}
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
@Schema()
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop({
    type: [CartItem],
    default: [],
  })
  items: CartItem[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);
