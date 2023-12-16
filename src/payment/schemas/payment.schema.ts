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
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  @IsMongoId()
  order: string;

  @Prop({ required: true })
  @IsNumber()
  amount: number;

  @Prop({ type: String, enum: Object.values(PaymentMethod), required: true })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @Prop({
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  })
  @IsEnum(['pending', 'success', 'failed'])
  status: 'pending' | 'success' | 'failed';

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
