import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }
  async exists(productId: string): Promise<boolean> {
    try {
      const product = await this.productModel.findById(productId).exec();
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      return !!product; // Returns true if product exists, false otherwise
    } catch (err) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }
  async insertMany(products: Product[]): Promise<Product[]> {
    return this.productModel.insertMany(products);
  }
}
