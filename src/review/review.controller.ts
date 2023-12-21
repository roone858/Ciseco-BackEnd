// review.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { AdminGuard } from 'src/users/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    return this.reviewService.findAll();
  }
  @Get(':productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(productId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }
}
