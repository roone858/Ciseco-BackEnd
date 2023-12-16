import { Controller, Param, Get } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  async createShipping(@Param('orderId') orderId: string) {
    return this.shippingService.createShipping(orderId);
  }
}
