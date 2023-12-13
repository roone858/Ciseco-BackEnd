import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).exec();
  }
  async getOrderByUserId(userId: string) {
    return this.orderModel.findOne({ user: userId }).exec();
  }
}
