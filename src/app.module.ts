import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ReviewModule } from './review/review.module';

import { OrderModule } from './orders/order.module';
import { CartModule } from './cart/cart.module';
import { ShippingModule } from './shipping/shipping.module';
import { WishlistModule } from './wishlist/wishlist.module';
// import { MulterConfigModule } from './multer/multer.module';
import { APP_FILTER } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { ValidationExceptionFilter } from './exceptions/validation-exception.filter';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    CartModule,
    ProductsModule,
    OrderModule,
    ReviewModule,
    ShippingModule,
    WishlistModule,
    MailModule,
    // MulterConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
