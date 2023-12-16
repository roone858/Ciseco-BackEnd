// order.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderController } from './order.controller';
import { CartService } from 'src/cart/cart.service';
import { CartModule } from 'src/cart/cart.module';
import { Cart, CartSchema } from 'src/cart/schemas/cart.schema';

@Module({
  imports: [
    CartModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService],
})
export class OrderModule {}
