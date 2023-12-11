import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewService } from './review.service';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ProductsService],
})
export class ReviewModule {}
