import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from 'src/review/schemas/review.schema';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    private readonly productService: ProductsService,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find();
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ product: productId })
      .populate({
        path: 'user',
        select: 'name image username', // Exclude phone, email, and password
      })
      .lean()
      .exec();
  }

  async findByProductAndUser(
    productId: string,
    userId: string,
  ): Promise<Review> {
    // Check if the product exists before querying reviews
    await this.productService.findById(productId);

    // Find reviews based on both product_id and user_id
    return this.reviewModel
      .findOne({ product: productId, user: userId })
      .exec();
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const reviewExists = await this.findByProductAndUser(
      createReviewDto.product,
      createReviewDto.user,
    );
    if (reviewExists)
      throw new ConflictException(
        `Review for product ${createReviewDto.product} by user ${createReviewDto.user} already exists`,
      );

    const productExists = await this.productService.exists(
      createReviewDto.product,
    );
    if (!productExists)
      throw new ConflictException(
        ` product ${createReviewDto.product}  not found`,
      );

    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }
}
