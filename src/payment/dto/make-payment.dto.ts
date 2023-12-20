import { IsString, IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '../schemas/payment.schema';

export class MakePaymentDto {
  @IsString()
  readonly user: string;

  @IsString()
  readonly order: string;

  @IsNumber()
  readonly amount: number;

  @IsEnum(PaymentMethod, { message: 'Invalid payment method' })
  readonly paymentMethod: PaymentMethod;
}
