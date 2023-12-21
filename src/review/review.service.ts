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
      .find({ productId: productId })
      .populate({
        path: 'userId',
        select: 'name image username', // Exclude phone, email, and password
      })
      .lean()
      .exec();
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const existingReview = await this.findByProductAndUser(
      createReviewDto.productId,
      createReviewDto.userId,
    );
    if (existingReview) {
      // Update the existing review if it exists
      return this.reviewModel.findByIdAndUpdate(
        existingReview._id,
        createReviewDto,
        { new: true },
      );
    }

    const productExists = await this.productService.exists(
      createReviewDto.productId,
    );

    if (!productExists) {
      throw new ConflictException(
        `Product ${createReviewDto.productId} not found`,
      );
    }

    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findByProductAndUser(
    productId: string,
    userId: string,
  ): Promise<ReviewDocument | null> {
    return this.reviewModel.findOne({ productId, userId }).exec();
  }
}
