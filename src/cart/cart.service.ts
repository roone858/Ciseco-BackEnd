import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Cart, CartDocument, CartItem } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async getUserCart(userId: string) {
    const cart = await this.cartModel.findOne({ userId });
    if (!cart) {
      const cart = new this.cartModel({ userId: userId });
      return await cart.save();
    }
    return cart;
  }

  async addToCart(
    user: UserDocument,
    cartItem: CartItem,
  ): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: user._id });
    const item = cart.items.find(
      (item) => item.productId == cartItem.productId,
    );
    if (item) item.quantity = item.quantity + cartItem.quantity;
    else cart.items.push({ ...cartItem });
    console.log(user);
    return await cart.save();
  }

  async removeFromCart(userId: string, itemId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: userId });
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== itemId,
    );

    return await cart.save();
  }
}
