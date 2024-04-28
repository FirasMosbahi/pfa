import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BuyProductDto } from './product.dto';
import { Types } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query('categoryId') categoryId: string | undefined) {
    return await this.productsService.getProducts(categoryId);
  }

  @Patch('/buy/:productId')
  async buyProduct(
    @Param('productId') productId: string,
    @Body() quantity: BuyProductDto,
  ) {
    return await this.productsService.buyProducts(
      new Types.ObjectId(productId),
      quantity.quantity,
    );
  }
}
