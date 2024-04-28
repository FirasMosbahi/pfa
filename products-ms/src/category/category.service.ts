import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/repository.service';
import { Category } from '../schema/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService extends CommonRepository<Category> {
  protected readonly modelName: string = Category.name;

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
