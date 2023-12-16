import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMethod } from './schemas/payment.schema';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(
    @Body('user') userId: string,
    @Body('order') orderId: string,
    @Body('amount') amount: number,
    @Body('paymentMethod') paymentMethod: PaymentMethod,
  ) {
    return this.paymentService.makePayment(
      userId,
      orderId,
      amount,
      paymentMethod,
    );
  }
}
