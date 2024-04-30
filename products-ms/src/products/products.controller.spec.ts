import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from '../schema/product.schema';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          validationSchema: Joi.object({
            PORT: Joi.number().required(),
            DB_HOST: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
          }),
          envFilePath: '.env',
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get('DB_HOST'),
          }),
        }),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductsSchema },
        ]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
