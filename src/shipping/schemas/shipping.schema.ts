import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShippingDocument = Shipping & Document;

enum ShippingStatus {
  Shipped = 'shipped',
  OutForDelivery = 'out for delivery',
  Delivered = 'delivered',
}

@Schema()
export class Shipping {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Order', unique: true }) // Reference to the Customer schema
  orderId: string;
  @Prop()
  shipping_target_address_id: string;

  @Prop()
  shippingMethod: string;

  @Prop({
    required: true,
    default: ShippingStatus.Shipped,
    enum: ShippingStatus,
  })
  status: ShippingStatus;
}
export const ShippingSchema = SchemaFactory.createForClass(Shipping);
