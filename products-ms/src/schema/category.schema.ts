import { BaseSchema } from './base.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Category extends BaseSchema {
  @Prop({ required: true , type : SchemaTypes.String })
  name: string;

  @Prop({ required: true , type : SchemaTypes.String })
}
