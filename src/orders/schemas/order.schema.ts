import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CartItem, CartItemSchema } from 'src/cart/schemas/cart.schema';

export type OrderDocument = Order & Document;

enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

@Schema()
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', unique: true }) // Reference to the Customer schema
  user: string;

  @Prop({ required: true })
  order_date: Date;

  @Prop({ required: true })
  total_amount: number;

  @Prop({ required: true, default: OrderStatus.Pending, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ required: true, type: [CartItemSchema] })
  order_items: CartItem[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
