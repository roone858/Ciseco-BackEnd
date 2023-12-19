// src/wishlist/wishlist.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from './schema/wishlist.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  async createWishlistItem(
    userId: string,
    productId: string,
  ): Promise<Wishlist> {
    const createdWishlistItem = new this.wishlistModel({ userId, productId });
    return createdWishlistItem.save();
  }

  //   async getWishlistOrCreate(
  //     userId: string,
  //     product: string,
  //   ): Promise<Wishlist> {
  //     const wishlist = this.wishlistModel.find({ userId }).exec();
  //     if(!wishlist)
  //     const createdWishlistItem = new this.wishlistModel({ userId, product });
  //     return createdWishlistItem.save();
  //   }
  async getWishlist(userId: string): Promise<Wishlist[]> {
    return this.wishlistModel.find({ userId }).exec();
    //     return this.wishlistModel.find({ userId }).populate('product').exec();
  }

  async removeWishlistItem(userId: string, productId: string): Promise<void> {
    await this.wishlistModel
      .findOneAndDelete({ userId: userId, productId: productId })
      .exec();
  }
}
