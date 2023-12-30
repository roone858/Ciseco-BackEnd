import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
  ) {
    this.stripe = new Stripe(
      'sk_test_51OM8bHDLQcvajEnucHWx2eB0vlLJhksfadJAf44q23DUYnRuMwK42mK0HXcAwvYxCR6FiDmbCfCKZZRLJKH4BPys00H6r1sCuM',
    );
  }

  checkout(cart: any) {
    const totalPrice = cart.reduce((acc, item) => acc + item.subtotal, 0);

    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, // cents
      currency: 'usd', // set currency
      payment_method_types: ['card'],
    });
  }
  async makePayment(newPay): Promise<Payment> {
    const payment = new this.paymentModel(newPay);
    return await payment.save();
  }
}
