import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewModule } from './review/review.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { OrderModule } from './orders/order.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    ProductsModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService, CartService],
})
export class AppModule {}
