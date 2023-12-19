import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './schema/wishlist.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add/:product')
  async addToWishlist(
    @User() user: UserDocument,
    @Param('product') product: string,
  ): Promise<Wishlist> {
    const userId = user._id;
    console.log(userId);
    return this.wishlistService.createWishlistItem(userId, product);
  }

  @Get()
  async getWishlist(@User() user: UserDocument): Promise<Wishlist[]> {
    const userId = user._id;
    return this.wishlistService.getWishlist(userId);
  }

  @Delete('remove/:productId')
  async removeFromWishlist(
    @User() user: UserDocument,
    @Param('productId') productId: string,
  ): Promise<void> {
    const userId = user._id;

    return this.wishlistService.removeWishlistItem(userId, productId);
  }
}
