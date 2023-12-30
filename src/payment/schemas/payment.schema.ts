import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsEnum, IsNumber, IsMongoId } from 'class-validator';

export enum PaymentMethod {
  CreditCard = 'creditCard',
  Paypal = 'paypal',
}

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @IsMongoId()
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  @IsMongoId()
  orderId: string;

  @Prop({ required: true })
  @IsNumber()
  amount: number;

  @Prop({ type: String, enum: Object.values(PaymentMethod), required: true })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
