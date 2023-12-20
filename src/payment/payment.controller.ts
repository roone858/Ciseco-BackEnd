import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from './dto/make-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(
      makePaymentDto.user,
      makePaymentDto.order,
      makePaymentDto.amount,
      makePaymentDto.paymentMethod,
    );
  }
}
