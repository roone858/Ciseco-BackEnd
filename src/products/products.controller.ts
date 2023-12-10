import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/products.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }
  @UseGuards(AuthGuard)
  @Post('insertMany')
  async insertMany(@Body() products: Product[]): Promise<Product[]> {
    return this.productsService.insertMany(products);
  }
}
