import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/make-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/checkout')
  checkout(@Body() body: { cart: any }) {
    try {
      return this.paymentService.checkout(body.cart);
    } catch (error) {
      return error;
    }
  }
  @Post()
  async makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
