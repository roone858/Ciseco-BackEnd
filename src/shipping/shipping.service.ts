import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shipping } from './schemas/shipping.schema';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(Shipping.name) private readonly shippingModel: Model<Shipping>,
  ) {}

  async createShipping(orderId: string): Promise<Shipping> {
    const createdShipping = new this.shippingModel({
      orderId,
    });
    return await createdShipping.save();
  }
}
