import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentMethod } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {}

  async makePayment(
    userId: string,
    orderId: string,
    amount: number,
    paymentMethod: PaymentMethod,
  ): Promise<Payment> {
    const payment = new this.paymentModel({
      user: userId,
      order: orderId,
      amount,
      paymentMethod,
    });
    return await payment.save();
  }
}
