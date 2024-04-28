import { BaseSchema } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Category } from './category.schema';

@Schema()
export class Product extends BaseSchema {
  @Prop({ required: true, type: SchemaTypes.String })
  name: string;

  @Prop({ required: true, type: SchemaTypes.String })
  photo: string;

  @Prop({ required: true, type: SchemaTypes.Number })
  price: number;

  @Prop({ required: true, type: SchemaTypes.Number })
  quantity: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Category.name })
  categoryId: Types.ObjectId;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
