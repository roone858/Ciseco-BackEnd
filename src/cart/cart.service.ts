import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserCart(user: User) {
    const userWithCart = await this.userModel
      .findOne({ username: user.username })
      .select('cart')
      .populate({
        path: 'cart.product',
        select: 'title image ',
      });
    return userWithCart.cart;
  }

  async addToCart(
    reqUser: UserDocument,
    cartItem: CreateCartItemDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: reqUser.username });
    user.cart.push({ ...cartItem });
    console.log(user);
    return await user.save();
  }

  async removeFromCart(
    reqUser: UserDocument,
    itemId: string,
  ): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: reqUser.username });
    user.cart = user.cart.filter((item) => item.product.toString() !== itemId);

    return await user.save();
  }
}
