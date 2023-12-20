// cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'; // Use your authentication guard
import { UserDocument } from 'src/users/schemas/user.schema';
import { User } from 'src/users/user.decorator';
import { AddToCartDto } from './dto/create-cart-item.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard) // Secure the cart endpoints with authentication
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@User() user: UserDocument) {
    return this.cartService.getUserCart(user._id);
  }

  @Post('add')
  addToCart(@User() user: UserDocument, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(user, addToCartDto);
  }

  @Delete(':itemId')
  removeFromCart(@User() user: UserDocument, @Param('itemId') itemId: string) {
    return this.cartService.removeFromCart(user._id, itemId);
  }
}
