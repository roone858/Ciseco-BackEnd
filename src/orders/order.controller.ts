// order.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/users/admin.guard';
import { User } from 'src/users/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @User() user: UserDocument,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder({
      ...createOrderDto,
      userId: user._id,
    });
  }
  @Get()
  @UseGuards(AdminGuard)
  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get('/main')
  async getOrderById(@User() user: UserDocument): Promise<Order> {
    console.log(user);
    return this.orderService.getOrderByUserId(user._id);
  }
}
