import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './/schemas/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productModel.findOne({ id }).exec();
  }
  async insertMany(products: Product[]): Promise<Product[]> {
    return this.productModel.insertMany(products);
  }
}
