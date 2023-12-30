import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;

enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

@Schema()
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', unique: true }) // Reference to the Customer schema
  userId: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  tax: number;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, default: OrderStatus.Pending, enum: OrderStatus })
  paid: OrderStatus;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Cart', unique: true }) // Reference to the Customer schema
  cartId: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
