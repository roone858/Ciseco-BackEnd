import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/create-cart-item.dto';
// import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    // private readonly productService: ProductsService,
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
    cartItem: AddToCartDto,
  ): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: user._id });
    const item = cart.items.find(
      (item) => item.productId == cartItem.productId,
    );
    if (item) {
      const price = item.subtotal / item.quantity;
      item.quantity = item.quantity + cartItem.quantity;
      item.subtotal = parseFloat((price * item.quantity).toFixed(2));
    } else {
      cart.items.push({ ...cartItem });
    }
    cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);

    return await cart.save();
  }

  async removeFromCart(userId: string, itemId: string): Promise<CartDocument> {
    const cart = await this.cartModel.findOne({ userId: userId });
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== itemId,
    );
    cart.total = cart.items.reduce((acc, item) => acc + item.subtotal, 0);
    cart.total = parseFloat(cart.total.toFixed(2));

    return await cart.save();
  }
}
