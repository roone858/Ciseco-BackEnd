import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { UserDocument } from 'src/users/schemas/user.schema';

export type OrderDocument = Order & Document;
@Schema()
export class OrderItem {
  @Prop({
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  subtotal: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User', unique: true }) // Reference to the Customer schema
  user: UserDocument;

  @Prop({ required: true })
  order_date: Date;

  @Prop({ required: true })
  total_amount: number;

  @Prop({ required: true, type: [OrderItemSchema] })
  order_items: OrderItem[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
