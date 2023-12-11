import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  getUserCart(user) {
    return user.cart;
  }

  async addToCart(reqUser: UserDocument, item: any): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username: reqUser.username });
    user.cart.push({ ...item });
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
