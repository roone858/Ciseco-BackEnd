import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Cart, CartDocument, CartItem } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async getUserCart(user: User) {
    console.log(user);
    const cart = await this.cartModel.findOne({ user: user });
    if (!cart) {
      const cart = new this.cartModel({ user: user });
      return await cart.save();
    }
    return cart;
  }

  async addToCart(
    user: UserDocument,
    cartItem: CartItem,
  ): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ user: user });
    cart.items.push({ ...cartItem });
    console.log(user);
    return await cart.save();
  }

  async removeFromCart(
    user: UserDocument,
    itemId: string,
  ): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ user: user });
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== itemId,
    );

    return await cart.save();
  }
}
