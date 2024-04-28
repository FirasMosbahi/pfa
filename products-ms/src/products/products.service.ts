import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from '../schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonRepository } from '../common/repository.service';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductsService extends CommonRepository<Product> {
  protected readonly modelName: string = Product.name;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {
    super(productModel);
  }

  async getProducts(categoryId: string | undefined): Promise<Product[]> {
    const id = categoryId ? new Types.ObjectId(categoryId) : undefined;
    const query = categoryId ? { categoryId: id } : {};
    return this.find(query);
  }

  async buyProducts(productId: Types.ObjectId, quantity: number) {
    const product = await this.findById(productId);
    if (product.quantity < quantity) {
      throw new BadRequestException('quantity not available');
    }
    return await this.findByIdAndUpdate(
      productId,
      {
        $inc: { quantity: quantity * -1 },
      },
      { new: true },
    );
  }
}
